module.exports = function() {

    // 引入插件管理器
    var plugins = require("gulp-load-plugins")();

    // 加载插件
    plugins.fs              = require('fs');
    plugins.concat          = require("gulp-concat");
    plugins.rename          = require("gulp-rename");
    plugins.clean           = require("gulp-clean");
    plugins.uglify          = require("gulp-uglify");
    plugins.jshint          = require("gulp-jshint");
    plugins.cssminify       = require("gulp-minify-css");
    plugins.less            = require("gulp-less");
    plugins.autoprefixer    = require("gulp-autoprefixer");
    plugins.browserSync     = require("browser-sync").create();
    plugins.changed         = require("gulp-changed");
    plugins.inject          = require("gulp-inject");
    plugins.tap             = require("gulp-tap");
    plugins.Remarkable      = require('remarkable');
    plugins.gutil           = require('gulp-util');
    plugins.chalk           = require('chalk');
    plugins.minimist        = require('minimist');
    // plugins.source          = require('vinyl-source-stream');  

    // 引入通用方法集
    plugins.utils            = require("./utils")();

    return plugins;
};