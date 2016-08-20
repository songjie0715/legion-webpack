/**
 * Created by Yinxiong on 2016/3/11 0011.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var nodeStatic = require('node-static');
var config = require('./config');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');

var DIST_DIR = './dist';
var SRC_DIR = './src';

gulp.task('sass', function () {
	return gulp.src(SRC_DIR + '/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(clean())
        .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(DIST_DIR + '/css/'))
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['sass']);
});

var file = new nodeStatic.Server('./', {
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});

gulp.task('server', function () {
	require('http').createServer(function (request, response) {
		request.addListener('end', function () {
			file.serve(request, response);
		}).resume();
	}).listen(config.product.port);
});


gulp.task('rev', function(){
    return gulp.src([DIST_DIR+'/css/*.css', DIST_DIR+'/js/*.js'],{base: DIST_DIR})
        .pipe(rev())
        .pipe(gulp.dest(DIST_DIR+'/build'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(DIST_DIR+'/build'))
});


gulp.task('compile', ['watch', 'sass']);

gulp.task('default', ['compile', 'server']);
