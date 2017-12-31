var gulp = require ('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var mmq = require('gulp-merge-media-queries');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rigger = require('gulp-rigger');

gulp.task('html', function(){
    return gulp.src('./src/*.html')
    .pipe(rigger())
    // .pipe(htmlmin({collapseWhitespace: true})) // минификатор html
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('html:content', function(){
    return gulp.src('./src/html/**/*.html')
    .pipe(gulp.dest('./dist/html'));
});

gulp.task('css', function(){
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(mmq({
      log: true
    }))
    // .pipe(cssnano()) //минификация генерируемого css
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('normalize', function(){
    return gulp.src('./src/normalize.css')
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){
    return gulp.src('./src/js/**/*.*')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('img', function(){
    return gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function(){
    return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
    gulp.watch('./src/js/**/*.js', ['js', 'html']);
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('del:dist', function() {
    return del.sync('./dist');
});

gulp.task('build', ['html', 'html:content', 'css', 'normalize', 'js', 'img', 'fonts']);

gulp.task('start', ['del:dist', 'build', 'server', 'watch']);