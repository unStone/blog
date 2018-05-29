# 前端 js 模块化

## 前端 js 模块化的起源

很早之前，管理网站业务的逻辑相对于现在普遍比较简单，而且一般网站都是多页面应用，每个页面的业务逻辑依托于不同的 js，当你需要的时候引用对应的 js 就行了，现在网页大量使用单页面应用，而且随着电脑性能，浏览器的支持，新标准的设立，前端工程越来越趋向于一个庞大的工程，对于整个前端工程开发，与维护来说，模块化的概念变得尤为重要。

## 在没有模块化的时候我们是怎么写代码的

模块就是实现特定功能的一组方法

### 最原始的写法

```js
function f1(){
  //...
}

function f2(){
  //...
}
```

一开始我们全局下定义一个个方法，这样在任意地方我们都可以简单的调用这些方法或变量。
这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

### 对象写法

```js
var module = {
  f1: function() {
    //...
  },
  f2: function() {
    //...
  }
}
```

这样子可以减少全局的污染，使用的时候，就是调用这个对象的属性。

```js
  module.f1()
```

但是这样写的话，外部可以修改 module 对象内部的任意方法或状态

```js
  module.f1 = function() {
    console.log('this is function3')
  }
```

### 立即执行函数写法(Immediately-Invoked Function Expression，IIFE)

```js
var module = (function(){

  var count = 1;
  var f1 = function() {
    //...
  }
  var f2 = function() {
    //...
  }

  return {
    f1: f1,
    f2: f2
  }
})()
```

```js
  console.infu(module.count) // undefined
```

使用这种方法可以让外部无法改变不想暴露的属性

### 放大模式

如果一个模块很大的话就可以使用这种方法了

```js
var modulePlus = (function(moduleBase) {
  moduleBase.f3 = function() {
    //...
  };
  return moduleBase;
})(moduleBase)
```

如果大家有看 zepto 的源码，就可以知道 zepto 加载非基础模块的时候用的就是这个模式

### 输入全局变量

这个时候我们怎么知道这个模块依赖哪些模块呢？

```js
var var module1 = (function ($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

我们把依赖的模块都显式地将其他变量输入模块，这样别人就知道这个模块依赖了哪些模块。

## 现在前端模块化现在有几种规范

模块化的开发方式可以提高代码复用率，方便进行代码的管理。
通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。目前流行的 js 模块化规范共有如下 4 种

- [AMD规范（Asynchronous Module Definition）](./AMD规范.md)
- [CMD规范（Common Module Definition）](./CMD规范.md)
- [CommonJS规范（NodeJS模块化方案）](./CommonJS规范.md)
- [ES6模块](./ES6模块.md)

## 方便快速理解

- AMD/CMD/CommonJs 是 JS 模块化开发的标准，目前对应的实现是 RequireJs/SeaJs/nodeJs.
- CommonJs 主要针对服务端，AMD/CMD 主要针对浏览器端，所以最容易混淆的是 AMD/CMD。（顺便提一下，针对服务器端和针对浏览器端有什么本质的区别呢？服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。这里如果有其他后端语言，如java，经验的‘玩家’应该更容易理解。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。）
- AMD/CMD 区别，虽然都是并行加载 js 文件，但还是有所区别，
  - AMD 是预加载，在并行加载 js 文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；
  - CMD 是懒加载，虽然会一开始就并行加载 js 文件，但是不会执行，而是在需要的时候才执行。
- AMD/CMD 的优缺点.一个的优点就是另一个的缺点， 可以对照浏览。
  - AMD 优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件。
  - AMD 缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑。
  - CMD 优点：因为只有在使用的时候才会解析执行 js 文件，因此，每个 JS 文件的执行顺序在代码中是有体现的，是可控的。
  - CMD 缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。

参考文档：
[Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
[前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
[前端总结·工具篇·管理（一）常用模块化方案](https://www.cnblogs.com/bergwhite/p/6618686.html)
