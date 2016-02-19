module.exports = function (gulp, $, config) {

    // clean html
    gulp.task("clean:html", function(){
        return gulp.src(config.tmp.html, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean css
    gulp.task("clean:css", function(){
        return gulp.src(config.tmp.css, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean js
    gulp.task("clean:js", function(){        
        return gulp.src(config.tmp.js, {read: false})
            .pipe($.clean({force :true}));
    });

    // clean folder
    gulp.task("clean", function(){        
        return gulp.src(config.tmp.index, {read: false})
            .pipe($.clean({force :true}));
    });

};