module.exports = function (gulp, $, config) {


    // clean html
    gulp.task("clean_html", function(){

        $.gutil.log( $.chalk.green('clean_html start...') );

        return gulp.src(config.tmp.html, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean css
    gulp.task("clean_css", function(){

        $.gutil.log( $.chalk.green('clean_css start...') );

        return gulp.src(config.tmp.css, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean js
    gulp.task("clean_js", function(){

        $.gutil.log( $.chalk.green('clean_js start...') );
        
        return gulp.src(config.tmp.js, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean folder
    gulp.task("clean", function(){

        $.gutil.log( $.chalk.green('clean start...') );
        
        return gulp.src(config.tmp.index, {read: false})
            .pipe($.clean({force :true}));
    });

};