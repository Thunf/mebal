module.exports = function (gulp, $, config) {

    // less
    gulp.task('less', ['clean:css'], function(){
        return gulp.src(config.sPath.less)
            .pipe($.changed(config.tmp.index, {extension: '.css'}))
            .pipe($.less())
            .pipe(gulp.dest(config.tmp.index));
    });

    // css concat/minify
    gulp.task('css:mini', ['less'], function(){
        return gulp.src(config.tmp.css)
            .pipe($.concat(config.name + '.css'))
            .pipe($.autoprefixer({
                browsers: ['> 1%'],
                cascade: false
            }))
            .pipe(gulp.dest(config.tPath.css))
            .pipe($.cssminify())
            .pipe($.rename({
                suffix: '.min',
                extname: '.css'
            }))
            .pipe(gulp.dest(config.tPath.css))
            .pipe($.browserSync.reload({stream: true}));
    });



};