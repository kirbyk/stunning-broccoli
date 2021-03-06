'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');
var normalize = require('node-normalize-scss');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');


var config = {
  sassPath: './src/styles',
  bowerDir: './bower_components',
  cssDestDir: './dist/assets/css',
  // jsPath: './src/scripts#<{(|.js',
  // jsDestDir: './dist/assets/js'
};

// gulp.task('copy', function() {
//   return gulp
//     .src(['./src/index.js'])
//     .pipe(gulp.dest('dist'));
// });
//
gulp.task('webpack', function() {
  return gulp.src('src/client.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('copy', function() {
  return gulp
    .src('./src/server.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
  return gulp
    .src('./src/views/**/*')
    .pipe(gulp.dest('dist/views'));
});

gulp.task('controllers', function() {
  return gulp
    .src('./src/controllers/**/*')
    .pipe(gulp.dest('dist/controllers'));
});

gulp.task('models', function() {
  return gulp
    .src('./src/models/**/*')
    .pipe(gulp.dest('dist/models'));
});

gulp.task('assets', function() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('icons', function() {
  return gulp
    .src(config.bowerDir + '/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

// gulp.task('scripts', function() {
//   return gulp.src([
//       config.bowerDir + '/jquery/dist/jquery.js',
//       config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
//       config.jsPath
//     ])
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest(config.jsDestDir));
// });

gulp.task('sass', function() {
  var sassPaths = neat.includePaths.concat(normalize.includePaths); // neat already includes bourbon
  sassPaths.push(config.bowerDir + '/bootstrap-sass/assets/stylesheets');
  sassPaths.push(config.bowerDir + '/font-awesome/scss');

  gulp.src(config.sassPath + '/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass({
      includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/styles/*.scss', ['sass']);
});

gulp.task('default', ['webpack', 'copy', 'assets', 'views', 'models', 'controllers', 'icons', 'sass']);
