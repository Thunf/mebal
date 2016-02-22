module.exports = function(gulp, $, config) {

    // watch
    gulp.task('watch', ['html:inject'], function() {
        gulp.watch(config.sPath.js, ['js:mini']).on('change', _hash2change);
        gulp.watch(config.sPath.less, ['css:mini']).on('change', _hash2change);
        gulp.watch([config.sPath.md, config.sPath.html], ['html:contents']).on('change', _hash2change);
    }).on('task_start', function(){
        // console.log(">>> task_start", arguments);
    }).on('task_stop', function(){
        // console.log(">>> task_stop", arguments);
    });

    function _hash2change(evt) {
        if (evt && evt.path) {
            var reg = new RegExp("/" + config.sPath.index + '([^\/]+)', 'g'),
                folder = reg.exec(evt.path)[1];

            $.browserSync.sockets.emit('fullscreen:message', {
                timeout: 10,
                script: $.utils.script(function(data) {
                    window.location.hash = data.folder;

                    // var body = document.getElementsByTagName('body')[0];
                    // var elem = document.createElement('script');
                    // body.appendChild(elem);
                    // elem.innerHTML = "alert('test')";
                }, {
                    folder: folder
                })
            });
        }
    }

}