module.exports = function(gulp, $, config) {

    gulp.task('bs:plugins', function() {
        $.browserSync.use({
            'plugin:name': 'Fullscreen Messages',
            plugin: function() {
                // $.gutil.log( $.chalk.green('bs-msg'), 'loading...' );
            },
            hooks: {
                "client:js": $.fs.readFileSync('gulp/browser-sync/bs-msg.js', 'utf8')
            }
        });
    });

};