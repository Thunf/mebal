var gulp = require("gulp"),
    config = require('./gulp/config')(),
    $ = require('./gulp/plugins')(),
    tasks = require('fs').readdirSync('./gulp/tasks/');

// 加载任务
tasks.forEach(function(taskfile) {
    require('./gulp/tasks/' + taskfile)(gulp, $, config);
});

// default
gulp.task('dev', ['watch', 'bs:plugins'], function() {
    // browser-sync
    $.browserSync.init({
        // plugins: ['bs-fullscreen-message'],
        server: "./"
    });
});