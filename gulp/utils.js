module.exports = function() {

    // 添加通用方法
    var config = require('./config')(),
        utils = {};

    // HTML转义
    utils.html_encode = function(str) {
        var s = '';
        if (!str.length) return s;
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/ /g, "&nbsp;");
        return s;
    };

    // 获取有序的源文件地址列表
    // 文件名列表，忽略文件，优先前排顺序，优先后排顺序
    utils.getSrcSort = function(files, ignore, firstOrder, lastOrder) {
        var path = config.tmp.index;

        // 去除忽略文件
        if (!!ignore && ignore.length) {
            for (var i = 0; i < ignore.length; i++) {
                var index = files.indexOf(ignore[i]);
                if (index > -1) {
                    files.splice(index, 1);
                };
            };
        };

        // 优先前排文件        
        if (!!firstOrder && firstOrder.length) {
            for (var i = firstOrder.length - 1; i >= 0; i--) {
                var index = files.indexOf(firstOrder[i]);
                if (index > -1) {
                    files.splice(index, 1);
                    files.splice(0, 0, firstOrder[i]);
                };
            };
        };

        // 优先后排文件
        if (!!lastOrder && lastOrder.length) {
            for (var i = 0; i < lastOrder.length; i++) {
                var index = files.indexOf(lastOrder[i]);
                if (index > -1) {
                    files.splice(index, 1);
                    files.push(lastOrder[i]);
                };
            };
        };

        // 添加地址
        for (var i = 0; i < files.length; i++) {
            files[i] = path + files[i] + "/*.html"
        };

        return files;
    };

    // 返回模板文件
    utils.getTemplates = function(name) {
        return {
            md: {
                contents: "### I'm " + name + ".md\nWrite some description here. \n<!-- inject:new_demo.html --> \n",
                name: 'doc'
            },
            html: {
                contents: '<div>Write DEMO here.</div>',
                name: 'new_demo'
            },
            js: {
                contents: '/* something */'
                    // name: 'script'
            },
            less: {
                contents: '/* something */'
                    // name: 'style'
            }
        }
    };

    // 转换fn
    utils.script = function(fn, vals) {
        if ('function' != typeof fn) {
            return '';
        };
        var data = {};
        if ('object' == typeof vals) {
            for (var k in vals) {
                if ('undefined' != typeof vals[k]) {
                    data[k] = vals[k];
                };
            }
        };
        return '(' + fn.toString() + ')(' + JSON.stringify(data) + ');';
    };

    utils.formatJson = function(data, indent){
        var str = [], indent = indent || 0, indentStr = '';
        if ('object' == typeof data) {
            for (var k in data) {
                var sline = '';
                if (data.hasOwnProperty(k)) {
                    if (!data.hasOwnProperty('length')) {
                        sline = JSON.stringify(k) + ": " ;
                    }
                    if ('object' != typeof data[k]) {
                        sline += JSON.stringify(data[k]);
                    }else{
                        sline += arguments.callee(data[k], indent+4);
                    }
                };
                if (sline && sline.length > 0 ) {
                    str.push(sline);
                }
            }
        } else {
            str = JSON.stringify(data);
        }
        for (var i = indent; i--;) {indentStr += ' '; };
        indentStr  = ',\n' + indentStr;
        if (data.length) {
            return '[' + str.join(indentStr) + ']';
        } else {
            if (!!indent) {
                return '{' + str.join(indentStr) + '}';
            }
            return str.join(indentStr);
        }
    };



    return utils;
};