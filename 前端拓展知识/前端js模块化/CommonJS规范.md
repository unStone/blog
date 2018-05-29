# CommonJS规范

## CommonJS的历史
[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)是一个项目，其目标是在浏览器外部（例如，在服务器上或为本地桌面应用程序）指定JavaScript的生态系统。

- 该项目于2009年1月由Mozilla工程师Kevin Dangoor 发起，最初名为ServerJS。

> “我在这里描述的不是技术问题。这是一个人们聚在一起并决定向前迈进，并开始建立更大更冷的东西的问题。”    - 凯文Dangoor [1]

- 2009年8月，该项目更名为CommonJS，以显示API的更广泛的适用性。[2]规范是在一个开放的过程中创建和批准的。规范只有在多个实现完成后才被视为最终规范。[3] CommonJS不隶属于使用ECMAScript的Ecma国际组TC39 ，但TC39的一些成员参与了该项目。

- 2013年5月，Node.js的包管理器npm的作者Isaac Z. Schlueter 说，CommonJS被Node.js过时了，核心Node.js开发人员也避免了。

## 实际使用
Node.js 是 commonJS 规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。实际使用时，用module.exports 定义当前模块对外输出的接口（不推荐直接用exports），用require加载模块。

定义一个模块
```js
// 定义模块math.js
var count = 0;
function plus(a, b) {
  return a + b;
}
module.exports = {
  plus: plus,
  count: count
}
```

使用模块
```js
const math = require('./math')

math.plus(1, 2) // 3
```

commonJS用同步的方式加载模块。
在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。
但是在浏览器端，限于网络原因，更合理的方案是使用异步加载

参考文档：
[CommonJS](https://en.wikipedia.org/wiki/CommonJS)
[CommonJs官网](http://www.commonjs.org/)