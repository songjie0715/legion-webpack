/**
 * Created by Yinxiong on 2016/3/11 0011.
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const config = require('./config');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');

const cssPath = `${config.srcDir}/scss`;
const jsPath = `${config.buildDir}/js`;

function readCss(cssPath){
    let arr = [];
    _.forEach(fs.readdirSync(cssPath), (f)=>{
        let stat = fs.statSync(path.join(cssPath, f));
        if(stat.isFile()){
            let name = path.parse(f).name;
            if(name.indexOf('_') != 0){
                arr.push(`<c:set var="css_${name}" value="css/${name}.css" />`)
            }
        }
    });
    return arr;
}

function readJs(isProduction){
    if(!isProduction){

        let names = {};
        _.forEach(config.commonChunks, (d, index)=>{
            if(d.name){
                names[d.name] = d.name;
            } else if( d.names ){
                _.map(d.names, d=>{
                    names[d] = d
                })
            }
        });

        return _.map(
            Object.assign({}, config.entry, names),
            (p, key)=>`<c:set var="js_${key}" value="js/${key}.js" />`
        )
    }

    let arr = [];

    _.forEach(fs.readdirSync(jsPath), f=>{
        let stat = fs.statSync(path.join(jsPath, f));
        if(stat.isFile()){
            let {name, ext} = path.parse(f);
            if(ext == '.js' && /[a-zA-Z0-9]+\.\D+/.test(name)){
                let realName = name.substring(name.indexOf('.')+1, name.length);
                arr.push(`<c:set var="js_${realName}" value="js/${f}" />`)
            }
        }
    });

    return arr;
}

gulp.task('sass', function () {
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.distDir + '/css/'))
        .pipe(gulp.dest(config.buildDir + '/css/'))
});

gulp.task('watch', function () {
    gulp.watch(config.srcDir+'/scss/**/*.scss', ['sass']);
});


//生成开发版静态依赖
gulp.task('generateDevManifest', ()=>{
    let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>'];
    content.push(`<c:set var="static_server_port" value="${config.dev.port}" />`);
    content.push(`<c:set var="static_server_ip" value="${config.dev.ip}" />`);
    content = content.concat(readCss(cssPath));
    content = content.concat(readJs());

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
    fs.readFile(manifestPath, (err, data)=>{
        if (err) throw err;
        const list = JSON.parse(data);
        _.forEach(list, (value, key)=>{
            let p = path.parse(key);
            let varName = p.dir.replace('/', '_') + '_' + p.name.replace(/\./g, '_');
            content.push(`<c:set var="${varName}" value="${value}" />`)
        });

        content = content.concat(readJs(true));

        fs.writeFile(config.jspManifestProd, content.join('\n'), (err) => {
            if (err) throw err;
            console.log('Production Manifest OK');
        })
    });
});

//文件版本号添加
gulp.task('rev', function(){
    return gulp.src([config.buildDir+'/css/*.css'],{base: config.buildDir})
        .pipe(clean())
        .pipe(gulp.dest(config.distDir))
        .pipe(rev())
        .pipe(gulp.dest(config.distDir))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(config.distDir))
});

gulp.task('copy:js', function(){
    return gulp.src(`${config.buildDir}/js/*.*`)
        .pipe(gulp.dest(`${config.distDir}/js`))
});

gulp.task('build', ()=>{
    runSequence('rev', 'copy:js')
});

//'generateDevManifest'
gulp.task('default', ['watch', 'sass']);