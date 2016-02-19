module.exports = function (gulp, $, config) {

    var md = new $.Remarkable({html: true});

    // 编译md并注入demo
    gulp.task('md:inject', ['clean:html'], function() {
        var stream, path, 
            folders = $.fs.readdirSync('src/');

        folders.forEach(function(folder) {
            if (-1 == ['.DS_Store', 'base'].indexOf(folder)) {
                path = config.sPath.index + folder;
                stream = gulp.src(path + '/*.md')
                    .pipe($.tap(function(file, t){
                        var template = [
                            '<section class="demo-section">',
                                '<a class="target-random" name="' + folder + '"></a>\n',
                                md.render(file.contents.toString('utf8')),
                            '</section>'
                        ].join('\n');
                        file.contents = Buffer.concat([
                            new Buffer(template)
                        ]);
                    }))
                    .pipe($.inject(gulp.src(path + '/*.html'), {
                        removeTags: true,
                        starttag: function(){
                            return '<!-- inject:code:{{ext}} -->';
                        },
                        transform: function(filePath, file) {
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