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

const DIST_DIR = './dist';
const SRC_DIR = './src';
const BUILD_DIR = './src/build';

const file = new nodeStatic.Server('./', {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

gulp.task('sass', function () {
	return gulp.src(SRC_DIR + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(clean())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(BUILD_DIR + '/css/'))
        .pipe(gulp.dest(DIST_DIR + '/css/'))
        .pipe(livereload())
});

gulp.task('watch', function () {
    livereload.listen({
        start: true
    });
	gulp.watch(SRC_DIR+'/scss/**/*.scss', ['sass']);
});

gulp.task('server', function () {
	require('http').createServer(function (request, response) {
		request.addListener('end', function () {
			file.serve(request, response);
		}).resume();
	}).listen(config.product.port);
});


gulp.task('rev', function(){
    return gulp.src([BUILD_DIR+'/css/*.css', BUILD_DIR+'/js/*.js'],{base: BUILD_DIR})
        .pipe(gulp.dest(DIST_DIR))
        .pipe(rev())
        .pipe(gulp.dest(DIST_DIR))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(DIST_DIR))
});

gulp.task('compile', ['watch', 'sass']);

gulp.task('default', ['compile', 'server']);
