module.exports = function (gulp, $, config) {

    // js hint
    gulp.task('jshint',function(){
        return gulp.src(config.sPath.js)
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
    });

    // js concat/uglify/minify
    gulp.task('jsmini', ['jshint', 'clean_js'], function(){
        return gulp.src(config.sPath.js)
            .pipe($.concat(config.name + '.js'))
            .pipe(gulp.dest(config.tPath.js))
            .pipe($.uglify())
            .pipe($.rename({
                suffix: '.min',
                extname: '.js'
            }))
            .pipe(gulp.dest(config.tPath.js))
            .pipe($.browserSync.reload({stream: true}));
    });


};