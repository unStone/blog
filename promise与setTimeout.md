# promise与setTimeout

## 前言
写这篇文章的原因是，有人问我如果执行如下代码，结果会是什么

```js
var newPromise = new Promise((resolve, reject) => {
  resolve()
})

setTimeout(function() {
  console.log('setTimeout')
},0)

newPromise
.then(() => {
  console.log('promise then')
})
.catch(() => {
  console.log('promise catch')
})
```

结果为
```
// promise then
// setTimeout
```

总的来说我猜对了结局和原因，但是还是对异步有一定的疑惑（是谁判断了这些异步已经执行完毕了）。

## 正文

为什么 setTimeout 会比 promise 慢呢？

那是因为当 setTimeout 的时间设定为 0 是，其实这个时间不是0，而是4ms，也就是说 promise 在异步队列里面没有最小时间，而 setTimeout 有最小4ms的限定。

那么究竟是谁告知队列，这个异步操作已经执行完了呢？
- onclick 由浏览器内核的 DOM Binding 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中。
- setTimeout 会由浏览器内核的 timer 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中。
- ajax 则会由浏览器内核的 network 模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。