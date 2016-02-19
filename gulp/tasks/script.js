module.exports = function (gulp, $, config) {

    // js hint
    gulp.task('js:hint',function(){
        return gulp.src(config.sPath.js)
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'));
    });

    // js concat/uglify/minify
    gulp.task('js:mini', ['js:hint', 'clean:js'], function(){
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