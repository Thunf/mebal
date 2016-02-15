module.exports = function (gulp, $, config) {

    // 由src/base/下的nav和index生成根目录下的index.html
    gulp.task('html_base', function(){
        var stream = gulp.src(config.sPath.html.index);
        for(var k in config.sPath.html){
            if (config.sPath.html.hasOwnProperty(k) && 'index' !== k) {
                stream.pipe($.inject(gulp.src([config.sPath.html[k]]), {
                    removeTags: true,
                    starttag: '<!-- inject:' + k + ':{{ext}} -->',
                    transform: function(filePath, file) {
                        return file.contents.toString('utf8');
                    }
                }));                
            }
        }
        stream.pipe(gulp.dest('./'));
        return stream;
    });

    // 注入主内容文件
    gulp.task('html_contents', ['md2html', 'html_base'], function(){
        var contents = gulp.src([config.tmp.index+'base/contents.html']),
            stream = gulp.src('index.html')
                .pipe($.inject(contents, {
                    removeTags: true,
                    starttag: function(){
                        return '<!-- inject:contents:{{ext}} -->';
                    },
                    transform: function(filePath, file) {
                        var template = [
                            '<section class="demo-section">',
                                file.contents.toString('utf8'),
                            '</section>'
                        ];
                        return template.join('\n');
                    }
                }))
                .pipe(gulp.dest('./'))
                .pipe($.browserSync.reload({stream: true}));
        return stream;
    });

    // 注入基础文件
    gulp.task('html_index', ['html_contents', 'cssmini', 'jsmini'], function(){
        var base = gulp.src([
                config.tPath.js + '**/*.min.js', 
                config.tPath.css + '**/*.min.css'
            ], {read: false}),
            stream = gulp.src('index.html')
                .pipe($.inject(base, {relative: true}))
        return stream;
    });

};