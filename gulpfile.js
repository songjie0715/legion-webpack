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

const file = new nodeStatic.Server('./', {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

gulp.task('sass', function () {
    return gulp.src(config.srcDir + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.buildDir + '/css/'))
        .pipe(gulp.dest(config.distDir + '/css/'))
        .pipe(livereload())
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
    gulp.watch(config.srcDir+'/scss/**/*.scss', ['sass']);
});

gulp.task('server', function () {
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(config.product.port);
});


gulp.task('rev', function(){
    return gulp.src([config.buildDir+'/css/*.css', config.buildDir+'/js/*.js'],{base: config.buildDir})
        .pipe(gulp.dest(config.distDir))
        .pipe(rev())
        .pipe(gulp.dest(config.distDir))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(config.distDir))
});

gulp.task('build', ['clean:css', 'rev']);

gulp.task('compile', ['watch', 'sass']);

gulp.task('default', ['compile', 'server']);
