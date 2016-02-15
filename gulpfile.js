var gulp    = require("gulp"),
    config  = require('./gulp/config')(),
    $       = require('./gulp/plugins')(),
    tasks   = require('fs').readdirSync('./gulp/tasks/');

// 加载任务
tasks.forEach(function(taskfile) {
    require('./gulp/tasks/' + taskfile)(gulp, $, config);
});

// watch
gulp.task('watch', ['html_index'],function(){

    $.gutil.log( $.chalk.green('watch start...') );

    gulp.watch(config.sPath.js, ['jsmini']);
    gulp.watch(config.sPath.less, ['cssmini']);
    gulp.watch([config.sPath.md, config.sPath.code], ['html_contents']);
});

// default
gulp.task('dev', ['watch'],function(){

    $.gutil.log( $.chalk.green('gulp start...') );

    // browser-sync
    $.browserSync.init({server: "./"});
    // gulp.watch(config.tPath.index)
    //     .on("change", $.browserSync.reload);
});