module.exports = function() {

    return {

        // tmp
        tmp: {
            index: '.tmp/',
            js: '.tmp/**/*.js',
            css: '.tmp/**/*.css',
            html: '.tmp/**/*.html'
        },

        // target path
        tPath: {
            index: 'dist/',
            js : 'dist/js/',
            css: 'dist/css/'
        },

        // src path
        sPath: {
            index: 'src/',
            js: 'src/**/*.js',
            md: 'src/**/*.md',
            code: 'src/**/*.html',
            less: 'src/**/*.less',

            html: {
                nav: 'src/base/nav.html',
                footer: 'src/base/footer.html',
                index: 'src/base/index.html'
            }
        }
        
    };
};