/**
 * Created by Yinxiong on 2016/3/11 0011.
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const config = require('./config');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');
const swig = require('gulp-swig');

const cssPath = `${config.srcDir}/scss`;
const jsPath = `${config.buildDir}/js`;
const viewPath = `${config.srcDir}/views`;

const swigDefaults = {
    defaults: {
        cache: false,
        // varControls: ['<%', '%>'],
        locals: {
            version: +(new Date)
        }
    }
};

const devLocals = _.merge({}, swigDefaults, {
    defaults: {
        locals: {
            staticPath: '/dist',
            basePath: '/',
            cssArray: readCss(),
            jsObj: _.reduce(readJs(), (result, item)=>{
                result[item.name] = item.value;
                return result;
            }, {})
        }
    }
});

const buildLocals = _.merge({}, swigDefaults, {
    defaults: {
        locals: {
            staticPath: '/dist',
            basePath: '/',
            cssArray: readCss(true),
            jsObj: _.reduce(readJs(true), (result, item)=>{
                result[item.name] = item.value;
                return result;
            }, {})
        }
    }
});

function readCss(isProduction){
    if(!isProduction){
        let arr = [];
        _.forEach(fs.readdirSync(cssPath), (f)=>{
            let stat = fs.statSync(path.join(cssPath, f));
            if(stat.isFile()){
                let name = path.parse(f).name;
                if(name.indexOf('_') != 0){
                    arr.push({name: name, value: name})
                }
            }
        });
        return arr;
    };

    const manifestPath = path.join(config.distDir, config.manifest);
    let arr = [];
    let data = fs.readFileSync(manifestPath);
    const list = JSON.parse(data);
    _.forEach(list, (value, key)=> {
        let p = path.parse(key);
        let varName = p.dir.replace('/', '_') + '_' + p.name.replace(/\./g, '_');
        arr.push({name: varName, value: path.parse(value).name});
    });

    return arr;
}

function _getChunkNames(){
    let names = _.map(config.commonChunks.filter((item)=>{
        return _.has(item, 'names');
    }), 'names');
    let name = _.map(config.commonChunks.filter((item)=>{
        return _.has(item, 'name');
    }), 'name');
    return _.uniq(_.flatten(names.concat(name)));
}

function readJs(isProduction){
    if(!isProduction){
        return _.map(
            _.uniq(_.flatten(_.keys(config.entry).concat(_getChunkNames()))),
            (p)=>{
                if(p){
                    return {name: p, value: p};
                }
            }
        )
    }

    let arr = [];

    _.forEach(fs.readdirSync(jsPath), f=>{
        let stat = fs.statSync(path.join(jsPath, f));
        if(stat.isFile()){
            let {name, ext} = path.parse(f);
            if(ext == '.js' && /[a-zA-Z0-9]+\.+\D+/.test(name)){
                let realName = _.last(name.split('-')[0].split('.'));
                arr.push({
                    name: realName,
                    value: name
                });
            }
        }
    });

    return arr;
}

gulp.task('swig', function () {
    return gulp.src(`${viewPath}/*.html`)
        .pipe(swig(devLocals))
        .pipe(gulp.dest(`${config.distDir}`))
});

gulp.task('swig:build', function () {
    return gulp.src(`${viewPath}/*.html`)
        .pipe(swig(buildLocals))
        .pipe(gulp.dest(`${config.distDir}`))
});

gulp.task('sass', function () {
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.distDir + '/css/'))
		.pipe(gulp.dest(config.buildDir + '/css/'))
});

gulp.task('clean:css', function(){
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(clean())
        .pipe(gulp.dest(config.distDir + '/css/'))
});

gulp.task('watch', function () {
	gulp.watch(`${config.srcDir}/scss/**/*.scss`, ['sass']);
    gulp.watch(`${viewPath}/**/*.html`, ['swig']);
});

//生成开发版静态依赖
gulp.task('generateDevManifest', ()=>{
	let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>'];
	content.push(`<c:set var="static_server_port" value="${config.dev.port}" />`);
	content = content.concat(_.map(readCss(), name=>`<c:set var="css_${name.name}" value="css/${name.value}.css" />`));
	content = content.concat(_.map(readJs(), (v)=>`<c:set var="js_${v.name}" value="js/${v.value}.js" />`));
	content.push(`<c:set var="js_common" value="js/common.js" />`);

	fs.writeFile(config.jspManifestDev, content.join('\n'), (err) => {
		if (err) throw err;
		console.log('Development Manifest OK');
	});
});

//生成生产版静态依赖
gulp.task('generateProdManifest', ()=>{
	console.log('> write manifest to _manifest_prod.jsp');

	const manifestPath = path.join(config.distDir, config.manifest);
	let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>'];
	content.push(`<c:set var="static_server_port" value="${config.dev.port}" />`);

    _.map(readCss(true), v=>{
        content.push(`<c:set var="${v.name}" value="${v.value}.css" />`)
    });

    content = content.concat(_.map(readJs(true), (v)=>`<c:set var="js_${v.name}" value="js/${v.value}.js" />`));

    fs.writeFile(config.jspManifestProd, content.join('\n'), (err) => {
        if (err) throw err;
        console.log('Production Manifest OK');
    })
});

gulp.task('copy:js', ()=>{
	console.log('copy js to dist');
	
	return gulp.src(`${config.buildDir}/js/*.js`)
		.pipe(gulp.dest(`${config.distDir}/js/`));
});

gulp.task('rev', function(){
	return gulp.src([config.buildDir+'/css/*.css'],{base: config.buildDir})
		.pipe(gulp.dest(config.distDir))
		.pipe(rev())
		.pipe(gulp.dest(config.distDir))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest(config.distDir))
});

gulp.task('build', ['clean:css', 'rev', 'swig:build', 'copy:js']);
gulp.task('default', ['watch', 'sass', 'swig']);

// // for java project
// gulp.task('default', ['watch', 'sass', 'swig', 'generateDevManifest']);
// gulp.task('build', ()=>{
// 	runSequence('swig:build', 'rev', 'copy:js', 'generateProdManifest')
// });