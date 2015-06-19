gulp       = require 'gulp'
concat     = require 'gulp-concat'
less       = require 'gulp-less'
plumber    = require 'gulp-plumber'
webserver  = require 'gulp-webserver'
browserify = require 'browserify'
babelify   = require 'babelify'
source     = require 'vinyl-source-stream'
bower      = require 'main-bower-files'

gulp.task 'default', ['build']

gulp.task 'build', ['html', 'js', 'css', 'vendor']

gulp.task 'html', ->
  gulp.src 'app/index.html'
    .pipe gulp.dest('public')

gulp.task 'js', ->
  browserify 'app/js/main.jsx'
    .transform babelify
    .bundle()
    .on 'error', (e) -> console.log(e.toString())
    .pipe source('app.js')
    .pipe gulp.dest('public')

gulp.task 'css', ->
  gulp.src 'app/css/**/*.less'
    .pipe plumber()
    .pipe less()
    .pipe concat('app.css')
    .pipe gulp.dest('public')

gulp.task 'vendor', ->
  gulp
    .src bower()
    .pipe plumber()
    .pipe concat('vendor.js')
    .pipe gulp.dest('public')

gulp.task 'watch', ['build'], ->
  gulp.watch 'app/index.html', ['html']
  gulp.watch 'app/js/**/*.js', ['js']
  gulp.watch 'app/js/**/*.jsx', ['js']
  gulp.watch 'app/css/**/*.less', ['css']
  gulp.watch 'bower_components/**/*.js', ['vendor']

gulp.task 'serve', ['watch'], ->
  gulp.src('public')
    .pipe webserver()
