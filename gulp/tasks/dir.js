module.exports = function (gulp, $, config) {

    // 获取文件排序
    gulp.task("get_dir_sort", function(){

        $.gutil.log( $.chalk.green('获取文件排序 start...') );

        var folders = require('fs').readdirSync('src/');

        return gulp.src(config.tmp.html, {read: false})
    });


};