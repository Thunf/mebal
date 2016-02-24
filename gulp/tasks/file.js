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

    // src/** sort
    gulp.task("file:sort", function(){

        // 初始化
        var sortBefore = [];
        // 读取现有src目录
        var folders = $.fs.readdirSync(config.sPath.index);

        // 判断排序干预文件是否存在
        if ($.fs.existsSync(config.sort.config)) {
            var sortFile = $.fs.readFileSync(config.sort.config, 'utf-8');
            // 如果文件有实际内容，则取出作为优先前置序列，此时优先级小于before配置
            if (!!sortFile.replace(/\s+/g, '')) {
                sortBefore = sortFile.replace(/[ \f\r\t\v]+/g, '').split('\n');
            };
        }

        // 读取配置
        var ignore  = config.sort && config.sort.ignore || [],
            before  = config.sort && config.sort.before || [],
            after   = config.sort && config.sort.after  || []

        // 获取源目录排序
        var srcSort = $.utils.getSrcSort(folders, ignore, before.concat(sortBefore), after);

        try{
            $.fs.writeFileSync(config.sort.config, srcSort.join('\n'));
            $.gutil.log($.chalk.green('create '), $.chalk.cyan(config.sort.config));
        }catch(e){
            $.gutil.log($.chalk.red('error when create '), $.chalk.cyan(config.sort.config), e.message || '');
        }

        return gulp.src(config.sort.config);
    });
};