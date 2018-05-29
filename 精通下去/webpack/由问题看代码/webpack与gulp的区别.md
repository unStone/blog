# webpack 与 gulp的区别

之前使用前端工具，都是浑浑噩噩，并没有具体区分优缺点，拿到什么用什么，这次乘业务不忙，把这些东西都可以拿出来理清楚。

## webpack 与 gulp 的官方描述

- webpack
> webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset
> webpack 是一个模块打包工具。它的主要目的是将 JavaScript 文件打包在浏览器中使用，但它也能够对任何资源或资产进行转换、捆绑或打包。

- gulp
> gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow
> gulp是一个工具包，可帮助您在开发工作流程中自动执行痛苦或耗时的任务

两个工具的区别是: `webpack` 是 **模块化打包工具**（module bundler），`gulp` 是可自动化的 **任务管理工具**（task runner）

## 任务管理工具
任务管理工具中我们可以声明若干任务，比如合并、压缩、测试等等。任务间可互相依赖，可以是同步，也可以是异步的。然后我们可以自由地选择运行哪个任务，任务管理工具会帮我们运行它（以及它的依赖）。

## 模块化打包工具
javascript本身并不支持模块化，但对于浏览器中的js和服务端的nodejs，它们运行环境是不同的，并且各自遵循某种规范，那么该如何实现js的模块化呢？

目前有两种主流方案：

### 在线编译模块化

    如seajs和requirejs模块框架，相当于在页面上加载一个CMD/AMD解释器，这样浏览器就认识了define、exports、module这些东西，也就实现了模块化。

### 预编译模块化

    webpack和browserify它们是一个预编译模块的方案，它们遵循了不需要在浏览器中加载解释器。在本地直接写js，不管是AMD/CMD/ES6风格的模块化，它都能识别并编译成浏览器认识的js。

## 这两个工具能做什么

### gulp

- 用 es6，typescript 编写的脚本文件需要编译成浏览器认识的 javascript
- 用 scss，less 编写的样式文件需要编译成浏览器认识的 css
- 检查代码是否符合书写规范，跑单元测试和集成测试
- 开发环境如果有 sourcemaps 的话调试起来就方便多了，修改完代码浏览器能自动刷新立即看到效果就更好了
- 生产环境部署代码需要压缩合并静态文件，添加文件指纹控制缓存
- ...

不过现在这些基本在 webpack 里利用各种插件都能做到了

### webpack

- 单页应用的核心是模块化，ES6 之前 JavaScript 语言本身一直是没有模块系统的，导致 AMD，CMD，UMD 各种轮子模块化方案都蹦出来。对这种模块化乱象，gulp 显得无能为力，gulp 插件对这一块也没有什么想法。不过也可以理解，模块化解决方案可不是谁都能 hold 住的，需要考虑的问题太多了；
- 对前沿的 SPA 技术 gulp 处理起来显得有些力不从心，例如 Vue 的单文件组件，gulp 配合一些插件可以勉强处理，但是很蹩脚。其实归根结底，还是模块化处理方面的不足；
- 优化页面加载速度的一条重要法则就是减少 http 请求。gulp 只是对静态资源做流式处理，处理之后并未做有效的优化整合，也就是说 gulp 忽略了系统层面的处理，这一块还有很大的优化空间，尤其是移动端，那才真的是一寸光阴一寸金啊，哪怕是几百毫秒的优化所带来的收益（用户？流量？付费？）绝对超乎你的想象。别跟我说 gulp-concat，CSS Sprites，这俩玩意儿小打小闹还行，遇上大型应用根本拿不上台面。现在的页面动辄上百个零碎资源（图片，样式表，脚本），也就是上百个 http 请求，因此这个优化需求还是相当迫切的。


阅读资料：
- [Gulp 和 Webpack 是一回事吗](http://liaokeyu.com/%E6%8A%80%E6%9C%AF/2017/03/20/Gulp%E5%92%8CWebpack%E6%98%AF%E4%B8%80%E5%9B%9E%E4%BA%8B%E5%90%97.html)
- [前端构建工具之争——Webpack vs Gulp 谁会被拍死在沙滩上](https://www.cnblogs.com/iovec/p/7921177.html)