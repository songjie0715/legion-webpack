/**
 * Created by Yinxiong on 2016/3/11 0011.
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const nodeStatic = require('node-static');
const config = require('./config');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const livereload = require('gulp-livereload');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const swig = require('gulp-swig');

const file = new nodeStatic.Server('./', {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

const cssPath = `${config.srcDir}/scss`;
const jsPath = `${config.srcDir}/js/entry`;
const viewPath = `${config.srcDir}/views`;

const swigDefaults = {
    defaults: {
        cache: false,
        varControls: ['<%', '%>'],
        locals: {
            version: +(new Date)
        }
    }
};

const devLocals = _.merge({}, swigDefaults, {
    defaults: {
        locals: {
            static: '/'
        }
    }
});

const buildLocals = _.merge({}, swigDefaults, {
    defaults: {
        locals: {
            static: ''
        }
    }
});

gulp.task('swig', function () {
    return gulp.src(`${viewPath}/*.html`)
        .pipe(swig(devLocals))
        .pipe(gulp.dest(`${config.distDir}/views`))
});

gulp.task('swig:build', function () {
    return gulp.src(`${config.srcDir}/views/*.html`)
        .pipe(swig(buildLocals))
        .pipe(gulp.dest(`${config.distDir}/views`))
});

function readCss(cssPath){
	let arr = [];
	_.forEach(fs.readdirSync(cssPath), (f)=>{
		let stat = fs.statSync(path.join(cssPath, f));
		if(stat.isFile()){
			let name = path.parse(f).name;
			arr.push(`<c:set var="css_${name}" value="css/${name}.css" />`)
		}
	});
	return arr;
}

function readJs(jsPath, dirName=''){
	let arr = [];
	_.forEach(fs.readdirSync(jsPath), (f)=>{
		let p = path.join(jsPath, f);
		let stat = fs.statSync(p);
		if(stat.isFile()){
			if(f.indexOf('.') > 0){
				let name = path.parse(f).name;
				let key = name.replace(/\./g, '_');
				if(dirName){
					arr.push(`<c:set var="js_${dirName}_${key}" value="js/${dirName}/${name}.js" />`)
				} else {
					arr.push(`<c:set var="js_${key}" value="js/${name}.js" />`)
				}
			}
		} else if(stat.isDirectory()){
			arr = arr.concat(readJs(p, f));
		}
	});
	return arr;
}

gulp.task('sass', function () {
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.distDir + '/css/'))
		.pipe(gulp.dest(config.buildDir + '/css/'))
        .pipe(livereload());
});

gulp.task('clean:css', function(){
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(clean())
        .pipe(gulp.dest(config.distDir + '/css/'))
});

gulp.task('watch', function () {
    livereload.listen({
        start: true
    });
	gulp.watch(`${config.srcDir}/scss/**/*.scss`, ['sass']);
    gulp.watch(`${viewPath}/**/*.html`, ['swig']);
});

gulp.task('server', function () {
	console.log(`Listening at http://localhost:${config.product.port}`);
	require('http').createServer(function (request, response) {
		request.addListener('end', function () {
			file.serve(request, response);
		}).resume();
	}).listen(config.product.port);
});


gulp.task('generateDevManifest', ()=>{
	let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>'];
	content = content.concat(readCss(cssPath));
	content = content.concat(readJs(jsPath));
	content.push(`<c:set var="js_common" value="js/common.js" />`);

	fs.writeFile(config.jspManifestDev, content.join('\n'), (err) => {
		if (err) throw err;
		console.log('Development Manifest OK');
	});
});

gulp.task('generateProdManifest', ()=>{
	console.log('> write manifest to jsp');

	const manifestPath = path.join(config.build.assetsRoot, config.manifest);
	let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>'];

	fs.readFile(manifestPath, (err, data)=>{
		if (err) throw err;
		const list = JSON.parse(data);
		_.forEach(list, (value, key)=>{
			let p = path.parse(key);
			let varName = p.dir.replace('/', '_') + '_' + p.name.replace(/\./g, '_');
			content.push(`<c:set var="${varName}" value="${value}" />`)
		});
		fs.writeFile(config.jspManifestProd, content.join('\n'), (err) => {
			if (err) throw err;
			console.log('Production Manifest OK');
		})
	});
});


gulp.task('rev', function(){
    return gulp.src([`${config.buildDir}/css/*.css`, `${config.buildDir}/js/*.js`],{base: config.buildDir})
        .pipe(gulp.dest(config.distDir))
        .pipe(rev())
        .pipe(gulp.dest(config.distDir))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(config.distDir))
});

gulp.task('build', ['clean:css', 'rev']);

gulp.task('compile', ['watch', 'sass', 'swig']);

gulp.task('default', ['compile', 'server']);

// for java project
// gulp.task('build', ['rev', 'generateProdManifest']);
// gulp.task('default', ['compile', 'generateDevManifest', 'server']);