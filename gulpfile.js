var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var cssminify = require("gulp-minify-css");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");


//路径
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

//js语法校验
gulp.task('jshint',function(){
	return gulp.src(oPath.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//js连接、压缩、歧义化
gulp.task('jsmini',['jshint'],function(){
	return gulp.src(oPath.js)
		.pipe(concat('mebal.js'))
		.pipe(gulp.dest(uPath.js))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(gulp.dest(uPath.js));
});

//css连接、压缩
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
		.pipe(gulp.dest(uPath.css));
});

gulp.task('less',function(){
	return gulp.src(oPath.less)
		.pipe(less())
		.pipe(gulp.dest(uPath.tmp));
});

//监测文件改动
gulp.task('watch',function(){
	var jsw   = gulp.watch(oPath.js, ['jsmini']);
	// var	cssw  = gulp.watch(uPath.tmp, ['cssmini']);
	var	lessw = gulp.watch(oPath.less, ['cssmini']);
});

//默认方法
gulp.task('default', ['cssmini','jsmini','watch'],function(){
	console.log("gulp start");
});