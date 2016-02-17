# mebal

> 收集一些自己喜欢的样式，收集并做成文档保存下来

[DEMO](http://thunf.github.io/mebal)

## 功能

### DONE

- DOC+DEMO自动生成
- 仅需填充对应的源文件（LESS/HTML/MD）
- 自动生成DEMO模板

### TODO

- 多DEMO组合自由注入（现为单DEMO一次注入DOC）【doc - demo1,demo2,...】
- 更改后自动跳转到对应DEMO【锚点】
- 排序干涉功能（现为自动按文件夹排序）【config】
- 可能考虑：多DEMO时按文件夹结构分页【待定】
- 可能考虑：插件化，并可进行初始化配置【待定】
- ...

## 使用

### 下载本项目，安装依赖：

```sh
	npm install
```

### 配置

打开 `gulp > config.js`，改一改项目名/路径什么的...

```js
{
    // 项目名称
    name: 'happy as you are',
    // tmp
    tmp: {...},
    // 目标文件
    tPath: {...},
    // 源文件
    sPath: {...}
}
```

> 目前config比较简陋，待加强...

### 新建DEMO

**例：新建名叫"test"的实例**

打开控制台，进入项目目录，运行：

```sh
	npm run new test
```

然后会自动生成test目录及文件，如：

```
src/
├── ...
└── test
    ├── demo.html
    ├── doc.md
    ├── test.js
    └── test.less
```

然后项目会自动启动开发模式，并在浏览器中打开页面。

此时在以上文件中编辑并保存就可以实时看到效果了


## 其他新功能

> `cmd > log.sh` 可以用来输出简单的彩色日志


## Authors

- Thunf [github/Thunf](https://github.com/Thunf)


## License

[MIT](https://github.com/jonschlinkert/remarkable/blob/master/LICENSE)




