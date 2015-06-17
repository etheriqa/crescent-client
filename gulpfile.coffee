gulp       = require 'gulp'
concat     = require 'gulp-concat'
less       = require 'gulp-less'
plumber    = require 'gulp-plumber'
browserify = require 'browserify'
babelify   = require 'babelify'
source     = require 'vinyl-source-stream'
bower      = require 'main-bower-files'
sync       = require 'browser-sync'

gulp.task 'default', ['build']

gulp.task 'build', ['html', 'js', 'css', 'vendor']

gulp.task 'html', ->
  gulp.src 'app/html/index.html'
    .pipe gulp.dest('public')

gulp.task 'js', ->
  browserify 'app/js/main.jsx'
    .transform babelify
    .bundle()
    .pipe plumber()
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

gulp.task 'watch', ->
  gulp.watch 'app/html/index.html', ['html', 'reload']
  gulp.watch 'app/js/**/*.jsx', ['js', 'reload']
  gulp.watch 'app/css/**/*.less', ['css', 'reload']

gulp.task 'server', ->
  sync
    server:
      baseDir: 'public'

gulp.task 'reload', ->
  sync.reload
