### 前端开发脚手架
通用前端开发工程，基于 [webpack](https://webpack.github.io/) 与 [gulp](http://gulpjs.com/) 的自动化构建工具，支持自动化构建版本。

### 技术选型
ES2015 / SASS / [vuejs](http://cn.vuejs.org) / [bootstrap#4.0.0](http://v4-alpha.getbootstrap.com/)

也可以为less或任何框架，修改编译器即可

### 预备环境
安装nodejs 5.12.0+

```shell
npm i gulp -g
npm i bower -g
npm i
```

### 配置说明
为了保持统一，配置文件尽量不要动，多项目时只改端口即可

```js
// config.js

const devPort = 9191; //webpack-dev-server 服务端口
const productPort = 9192; //node-static 服务端口

module.exports = {
    srcDir: './src', //源码地址
    distDir: './dist', //编译结果路径
    buildDir: './src/build', //构建路径
	entry: {
		client: './src/js/entry/client.js' //webpack入口文件
	},
	build: {
		assetsRoot: path.resolve(__dirname, 'dist'), //webpack编译路径
		assetsSubDirectory: 'js/',  //编译路径子目录
		assetsPublicPath: 'http://localhost:'+devPort+'/dist/js/', //webpack异步加载路径
		productionSourceMap: false
	},
	dev: {
		port: devPort,
		proxyTable: {}
	},
	product: {
		port: productPort
	}
};

```

### 特性
初期开发静态页面时，可以使用swig编译html，讲文件放到 dist 下， webpack-dev-server 可以自动刷新页面