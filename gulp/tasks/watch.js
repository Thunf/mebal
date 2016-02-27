module.exports = function(gulp, $, config) {

    // watch
    gulp.task('watch', ['html:inject'], function() {
        gulp.watch(config.sPath.js, ['js:mini']).on('change', _hash2change);
        gulp.watch(config.sPath.less, ['css:mini']).on('change', _hash2change);
        gulp.watch([config.sPath.md, config.sPath.html], ['html:contents']).on('change', _hash2change);
        // gulp.watch([config.sPath.md, config.sPath.html, config.sort.config], ['html:contents']).on('change', _hash2change);
    }).on('task_start', function(){
        // console.log(">>> task_start", arguments);
    }).on('task_stop', function(){
        // console.log(">>> task_stop", arguments);
    });

    function _hash2change(evt) {
        if (evt && evt.path) {
            var reg = new RegExp("/" + config.sPath.index + '([^\/]+)', 'g'),
                regRes = reg.exec(evt.path),
                folder = regRes && regRes[1] || '';

            if (!!folder) {
                $.browserSync.sockets.emit('fullscreen:message', {
                    timeout: 10,
                    script: $.utils.script(function(data) {

                        (function($){
                            if (!$) {
                                window.location.hash = data.folder;
                            } else {
                                var curItem = $("#" + data.folder),
                                    curItemTop = curItem.position().top,
                                    contentTop = $("#container.container").position().top;
                                // 动
                                $("body").scrollTop(curItemTop+contentTop);
                                // $('body').animate({scrollTop:curItemTop+contentTop}, 100);
                            }
                        })(window.jQuery);

                        // var body = document.getElementsByTagName('body')[0];
                        // var elem = document.createElement('script');
                        // body.appendChild(elem);
                        // elem.innerHTML = "alert('test')";
                    }, {
                        folder: folder
                    })
                });
            };
        }
    }
}