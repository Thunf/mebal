module.exports = function() {

    return {

        // 项目名称
        name: 'mebal',

        // 文件排序
        sort: {
            config: 'gulp/config/config_sort',
            ignore: ['.DS_Store', 'base'],
            before: ['test'],
            after: ['new']
        },

        // 临时文件目录
        tmp: {
            index: '.tmp/',
            js: '.tmp/**/*.js',
            css: '.tmp/**/*.css',
            html: '.tmp/**/*.html'
        },

        // 目标文件
        tPath: {
            index: 'dist/',
            js : 'dist/js/',
            css: 'dist/css/'
        },

        // 源文件
        sPath: {
            index: 'src/',
            js: 'src/**/*.js',
            less: 'src/**/*.less',
            md: 'src/**/*.md',
            html: 'src/**/*.html',

            base: {
                nav: 'src/base/nav.html',
                footer: 'src/base/footer.html',
                index: 'src/base/index.html'
            }
        }
        
    };
};