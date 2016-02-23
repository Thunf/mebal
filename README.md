# mebal

> 收集一些自己喜欢的样式，收集并做成文档保存下来

[DEMO](http://thunf.github.io/mebal)

## 功能

### DONE

- 仅需增加对应的源文件（LESS/HTML/MD）
- DOC+DEMO自动生成【inject】
- 自动生成DEMO模板【inject】
- 更改后自动跳转到对应DEMO【BS-锚点】
- 点击示例代码可以复制到粘贴板【zero-clipboard】
- 捕获编译错误，并将错误栈信息显示到页面上【BS-msg】
- 多DEMO组合自由注入（现为单DEMO一次注入DOC）【doc - demo1,demo2,...】

### TODO

- 排序干涉（现为自动按文件夹排序）【config】
- 编译错误后，若再次保存时编译通过，则去除浏览器端显示错误信息【现为延迟8s消失】
- 可能考虑：多DEMO时按文件夹结构分页【待定】
- 可能考虑：插件化，并可进行初始化配置【待定】
- 一些关于JS加载的问题【待遇到】
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

### 启动开发模式

```sh
	npm run dev
```

> 项目启动后，会自动打开页面，仅需编辑并保存文件即可实时看到效果


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

然后项目会`自动启动`开发模式，并在浏览器中打开页面。

此时在以上文件中编辑并保存就可以实时看到效果了


## 其他新功能

> `cmd > log.sh` 可以用来输出简单的彩色日志


## Authors

- Thunf [github/Thunf](https://github.com/Thunf)


# License

[MIT](https://github.com/Thunf/mebal/blob/develop/LICENSE)




