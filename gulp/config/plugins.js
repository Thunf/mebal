module.exports = function() {

    // 引入插件管理器
    var plugins = require("gulp-load-plugins")();

    // 加载插件
    plugins.browserSync     = require("browser-sync").create();
    plugins.fs              = require('fs');
    plugins.q               = require('q');
    plugins.concat          = require("gulp-concat");
    plugins.rename          = require("gulp-rename");
    plugins.clean           = require("gulp-clean");
    plugins.uglify          = require("gulp-uglify");
    plugins.jshint          = require("gulp-jshint");
    plugins.less            = require("gulp-less");
    plugins.cssminify       = require("gulp-minify-css");
    plugins.autoprefixer    = require("gulp-autoprefixer");
    plugins.changed         = require("gulp-changed");
    plugins.inject          = require("gulp-inject");
    plugins.tap             = require("gulp-tap");
    plugins.Remarkable      = require('remarkable');
    plugins.gutil           = require('gulp-util');
    plugins.chalk           = require('chalk');
    plugins.minimist        = require('minimist');
    plugins.plumber         = require('gulp-plumber');
    // plugins.source          = require('vinyl-source-stream');  

    // 引入通用方法集
    plugins.utils            = require("./utils")();

    return plugins;
};