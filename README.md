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
- 多DEMO组合自由注入(~~现为单DEMO一次注入DOC~~)[已支持文件名匹配]【doc - demo1,demo2,...】
- 排序干涉(~~现为自动按文件夹排序~~)[已配置化]【config】

### TODO

- 编译错误后，若再次保存时编译通过，则去除浏览器端显示错误信息(现为延迟8s消失)【待定】
- 可能考虑：插件化，并可进行初始化配置【待定】
- 可能考虑：多DEMO时按文件夹结构分页【待定】
- 一些关于JS加载的问题【待遇到】
- ...

## 使用

### 下载本项目，安装依赖：

```sh
	npm install
```

### 配置

打开 `gulp > config > config.js`，改一改项目名/路径什么的...

```js
{
    // 项目名称
    name: 'mebal',
    // 文件排序
    sort: {...},
    // tmp
    tmp: {...},
    // 目标文件
    tPath: {...},
    // 源文件
    sPath: {...}
}
```

#### name
项目名称，可以自行取名。 主要用来给输出文件(dist目录下)命名。

#### sort
```js
{   
    // 排序干预文件路径
    config: 'gulp/config/config_sort',
    // 忽略文件夹，不随文档注入
    ignore: ['.DS_Store', 'base'],
    // 优先前置文件夹
    before: ['test'],
    // 优先后置文件夹
    after: ['new']
}
```

> 更改`干预文件`会实时生效

> 优先级：优先后置 > 优先前置 > 排序干预文件顺序 > 默认目录首字母排序

#### tmp
临时文件路径，已加入`.gitignore`

#### tPath
目标路径(target path)，设置生成文件路径

#### sPath
源路径(src path)，设置源文件路径


> BTW，目前config比较粗糙，待优化...


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

#### test.less/test.js
css、js源码，请注意CSS命名空间及JS作用域

#### demo.html
实例模板文件，放置干净的实例html代码。【将会被显示为demo和code】
> 可自行新建，自行命名文件，需和doc.md中形成对应

#### doc.md
文档模板文件，放置组件说明。实例：

```html
## DEMO1
<!-- inject:demo1.html --> 

## DEMO2
<!-- inject:demo2.html --> 
```

- 当需要插入demo时，请使用行如 `<!-- inject:demo.html -->` 语法
- 其中demo.html需根据实际demo文件更改，支持不同行插入多个不同文件
- 目前仅支持.html结尾的demo模板



## 其他新功能

> `cmd > log.sh` 可以用来输出简单的彩色日志


## Authors

- Thunf [github/Thunf](https://github.com/Thunf)


# License

[MIT](https://github.com/Thunf/mebal/blob/develop/LICENSE)




