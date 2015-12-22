/*
 * @Author: mcxiaoke
 * @Date:   2015-12-22 21:10:18
 * @Last Modified by:   mcxiaoke
 * @Last Modified time: 2015-12-22 22:13:47
 */
// http://www.w3ctrain.com/2015/12/22/gulp-for-beginners/
var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var cache = require('gulp-cache');
var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
    console.log('Hello World!');
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', minifyCSS()))
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})


/**

gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})

**/
