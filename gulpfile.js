/* eslint-env node*/

'use strict';
const gulp = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();
const path = require('path');
const swPrecache = require('sw-precache');
const minifyInline = require('gulp-minify-inline');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');


gulp.task('default', ['dist']);



gulp.task('dist', ['compress'], () => {
	gulp.src('serve/index.html')
		.pipe(minifyInline())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy', ['js'], () => {
	gulp.src('serve/bus.png').pipe(gulp.dest('./dist'));
	gulp.src('serve/service-worker.js').pipe(gulp.dest('./dist'));
	gulp.src('serve/stations.json').pipe(gulp.dest('./dist'));
	gulp.src('serve/manifest.json').pipe(gulp.dest('./dist'));
});

gulp.task('compress', ['copy'], () => {
	gulp.src('serve/scripts/app.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'));
});

/**
 *	Serve static files
 */
gulp.task('serve', ['js'], () => {
	browserSync.init({
		server: {
			baseDir: './serve',
			// https: true
		},
	});
	gulp.watch('src/**/*.js', ['reload']);
	gulp.watch('serve/index.html', browserSync.reload);
});

gulp.task('js', ['js:compile', 'js:sw']);

/**
 *	Compile javascript.
 */
gulp.task('js:compile', shell.task(['npm run compile']));

/**
 *  Reload browser.
 * 	Compile scritps and styles first.
 */
gulp.task('reload', ['js'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('js:sw', function(callback) {
	let rootDir = './serve';
	swPrecache.write(path.join(rootDir, 'service-worker.js'), {
		staticFileGlobs: [rootDir + '/**/*.{js,html,css,json}'],
		stripPrefix: rootDir
	}, callback);
});
