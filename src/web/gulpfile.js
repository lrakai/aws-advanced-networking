var gulp = require('gulp');

// build plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Concatenate & Minify JS
gulp.task('scripts', function () {
  return gulp.src([
    'public/javascripts/vendor/angular.min.js',
    'public/javascripts/vendor/angular-*.min.js',
    'public/javascripts/*.js'
  ])
    .pipe(concat('dist.js'))
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/dist/'));
});

// default task
gulp.task('default', ['scripts']);
