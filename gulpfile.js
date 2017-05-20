/*
 WaterlooWorksPlus browser extension
 Copyright (C) 2017  Ze Hao (Kevin) Xiao

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const stylus = require('gulp-stylus');
const del = require('del');
const keepLicense = { preserveComments: 'license' };

const srcBundle = [ 'src/lib/jquery-3.2.1.min.js', 'src/lib/orbisapp.js', 'src/js/content.js' ];
const srcJs = [ 'src/js/background.js', 'src/js/inject_job_table.js', 'src/js/inject_message_table.js' ];
const srcCss = 'src/css/**/*.styl';
const copyFiles = [ 'src/img/**/*.*', 'src/manifest.json' ];
const distFolder = 'dist';

gulp.task('bundle', () => {
  return gulp.src(srcBundle)
      .pipe(concat('concat.js'))
      .pipe(gulp.dest(distFolder))
      .pipe(rename('bundle.js'))
      .pipe(uglify(keepLicense))
      .pipe(gulp.dest(distFolder));
});

gulp.task('uglify-separate', () => {
  return gulp.src(srcJs)
      .pipe(uglify(keepLicense))
      .pipe(gulp.dest(distFolder));
});

gulp.task('css', () => {
  return gulp.src(srcCss)
      .pipe(stylus())
      .pipe(cleanCss())
      .pipe(gulp.dest(distFolder));
});

gulp.task('copy', () => {
  return gulp.src(copyFiles)
      .pipe(gulp.dest(distFolder));
});

gulp.task('clean-leftover', [ 'bundle' ], () => {
  return del(distFolder + '/concat.js');
});

gulp.task('default', [ 'uglify-separate', 'bundle', 'css', 'copy', 'clean-leftover' ]);