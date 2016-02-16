var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var cssminify = require("gulp-minify-css");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var clean = require("gulp-clean");
var changed = require("gulp-changed");
var inject = require("gulp-inject");

// path
var oPath = {
    tmp : './.tmp/**/*.css',
    js  : './js/**/*.js',
    less: './less/**/*.less'
};

var uPath = {
    tmp: './.tmp/',
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
        .pipe(changed(uPath.tmp,{extension: '.css'}))
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

// clean
gulp.task("clean",function(){
    return gulp.src(uPath.tmp + '**/*.*',{read: false})
        .pipe(clean({force :true}));
});

// browser-sync
gulp.task("browser-sync",['clean'],function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch("./index.html").on("change", browserSync.reload);
});

// inject
gulp.task("inject", function(){
    var target = gulp.src("./index.html");
    var source = gulp.src([uPath.js + "**/*.min.js", uPath.css + "**/*.min.css"], {read: false});
    return target.pipe(inject(source, {relative: true})).pipe(gulp.dest('./'));
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