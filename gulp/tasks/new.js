module.exports = function (gulp, $, config) {

    // 获取命令行参数
    var options = $.minimist(process.argv.slice(2), {
        default: {
            // env: 'production',
            folder: 'new'
        }
    });

    var folderExists = false;

    // 获取文件排序
    gulp.task("new", function(){
        $.gutil.log( $.chalk.green('开始创建 ' + options.folder + ', start...') );

        var folderPath = config.sPath.index + options.folder + '/',
            templates = $.utils.getTemplates(options.folder);

        // 如果文件夹不存在
        if ($.fs.existsSync(folderPath)) {
            folderExists = true;
            return $.gutil.log( $.chalk.red(folderPath + ' 已经存在了，请换个名字重试') );
        }else{
            // 创建文件夹
            $.fs.mkdirSync(folderPath);
        };

        for(var ext in templates){
            var fileName = (templates[ext]['name'] || options.folder) + '.' + ext,
                contents = templates[ext]['contents'].toString('utf8');

            // 写模板文件
            (function(f, c, $){
                $.fs.writeFile(f, c, function (err) {
                    if (err) throw err;
                    $.gutil.log($.chalk.green('create'), $.chalk.cyan(f));
                });
            })(folderPath + fileName, contents, $);
        }

        // return;
    }).on("task_stop", function(t){
        if (!folderExists && t.task == "new") {
            gulp.start("dev");
        };
    });


};