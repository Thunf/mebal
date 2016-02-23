module.exports = function (gulp, $, config) {

    var md = new $.Remarkable({html: true});

    // 编译md并注入demo
    gulp.task('md:inject', ['clean:html'], function() {
        var stream, path, 
            folders = $.fs.readdirSync('src/');

        var injectReg = new RegExp("<!-- inject:([^\.]+)\.(\\w+) -->", "g");
        var injectObj = {};

        folders.forEach(function(folder) {
            if (-1 == ['.DS_Store', 'base'].indexOf(folder)) {
                // 拼接文件夹路径
                path = config.sPath.index + folder;

                // 开始管道操作
                stream = gulp.src(path + '/*.md')
                    .pipe($.tap(function(file, t){

                        // 初始化本文件夹注入记录对象
                        injectObj[folder] = {arr: [], times: 0 };

                        // 取得md文件内容
                        var fileContent = file.contents.toString('utf8'),
                        // 取得注入的文件名和后缀，记录并替换成注入标签
                        contents = fileContent.replace(injectReg, function(str, fname, ext){
                            injectObj[folder].arr.push([fname, ext].join('.'));
                            return '<!-- inject:' + ext + ' --><!-- endinject -->';
                        }),
                        // 重新打包模板内容
                        template = [
                            '<section class="demo-section">',
                                '<a class="target-random" name="' + folder + '"></a>\n',
                                md.render(contents),
                            '</section>'
                        ].join('\n');

                        file.contents = Buffer.concat([
                            new Buffer(template)
                        ]);
                    }))
                    // 此处为了解决注入标签错误导致注入错位问题，但又有异步的问题，待解决
                    // .pipe($.inject(gulp.src("src/"+folder+"{"+ injectObj[folder].arr +"}"), {
                    .pipe($.inject(gulp.src(path + '/*.html'), {
                        relative: true,
                        removeTags: true,
                        starttag: function(){
                            return '<!-- inject:{{ext}} -->';
                        },
                        transform: function(filePath, file, index, length, targetFile) {

                            // 记录当前为第几次注入[初始化为0，每次进入先自增1，从1开始]
                            injectObj[folder].times++;

                            // 本次为第几轮注入[轮数＝注入标签数，总注入数＝匹配文件数*标签数](ceil-1是因为标签记录数组下标从0开始)
                            var thisTime = Math.ceil(injectObj[folder].times/length)-1;

                            // 若本轮匹配中，匹配到对应的html文件，则注入
                            if (injectObj[folder].arr[thisTime] === filePath) {
                                var template = [
                                    '<div class="panel panel-default">',
                                        '<div class="panel-heading">',
                                            file.contents.toString('utf8'),
                                        '</div>',
                                        '<div class="panel-body">',
                                            '<pre class="demo-code" data-code="' + $.utils.html_encode(file.contents.toString('utf8')) + '"></pre>',
                                        '</div>',
                                    '</div>'
                                ];
                                return template.join('\n');
                            };
                        }
                    }))
                    .pipe($.rename({
                        suffix: '.md',
                        extname: '.html'
                    }))
                    .pipe(gulp.dest(config.tmp.index + folder));
            };
        });
        return stream;
    });

    // 生成内容html
    gulp.task('md:contents', ['md:inject'], function() {

        var folders = $.fs.readdirSync('src/'),
            srcSort = $.utils.getSrcSort(folders, ['.DS_Store', 'base'], [], ['new']);

        var stream = gulp.src(srcSort)
            .pipe($.concat('contents.html'))
            .pipe(gulp.dest(config.tmp.index + 'base'));

        return stream;

    });
};