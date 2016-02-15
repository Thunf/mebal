module.exports = function (gulp, $, config) {

    var md = new $.Remarkable({html: true});

    // 编译md并注入demo
    gulp.task('md_inject', ['clean_html'], function() {
        var stream, path, 
            folders = require('fs').readdirSync('src/');

        folders.forEach(function(folder) {
            if (-1 == ['.DS_Store', 'base'].indexOf(folder)) {
                path = config.sPath.index + folder;
                stream = gulp.src(path + '/*.md')
                    .pipe($.tap(function(file, t){
                        file.contents = Buffer.concat([
                            new Buffer(md.render(file.contents.toString('utf8')))
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
    gulp.task('md2html', ['md_inject'], function() {

        var folders = require('fs').readdirSync('src/'),
            srcSort = $.utils.getSrcSort(folders, ['.DS_Store', 'base'], [], ['new']);

        var stream = gulp.src(srcSort)
            .pipe($.concat('contents.html'))
            .pipe(gulp.dest(config.tmp.index + 'base'));

        return stream;

    });
};