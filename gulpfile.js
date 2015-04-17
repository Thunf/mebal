var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var cssminify = require("gulp-minify-css");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

// path
var oPath = {
    tmp : './.tmp/**/*.css',
    js  : './js/**/*.js',
    less: './less/**/*.less'
};

var uPath = {
    tmp: './.tmp',
    js : './dist/js/',
    css: './dist/css/'
};

// js hint
gulp.task('jshint',function(){
    return gulp.src(oPath.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// js concat/uglify/minify
gulp.task('jsmini',['jshint'],function(){
    return gulp.src(oPath.js)
        .pipe(concat('mebal.js'))
        .pipe(gulp.dest(uPath.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(gulp.dest(uPath.js))
        .pipe(browserSync.reload({stream: true}));
});

// less
gulp.task('less',function(){
    return gulp.src(oPath.less)
        .pipe(less())
        .pipe(gulp.dest(uPath.tmp));
});

// css concat/minify
gulp.task('cssmini',['less'],function(){
    return gulp.src(oPath.tmp)
        .pipe(concat('mebal.css'))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest(uPath.css))
        .pipe(cssminify())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulp.dest(uPath.css))
        .pipe(browserSync.reload({stream: true}));
});

// browser-sync
gulp.task("browser-sync",function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch("./index.html").on("change", browserSync.reload);
});

// watch
gulp.task('watch',function(){
    gulp.watch(oPath.js, ['jsmini']);
    gulp.watch(oPath.less, ['cssmini']);
});

// default
gulp.task('default', ['browser-sync','cssmini','jsmini','watch'],function(){
    console.log("gulp start");
});