# javascript中的 apply、call、bind 都是干什么的

## 文章内容

1. apply、call、bind 的用法，及意义，他们都是怎么用的
2. 关于 apply、call、bind 的示例

## 正文


### 1. [apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
> #### func.apply(this[, argsArray])

方法调用一个函数, 其具有一个指定的 this 值，以及作为一个数组（或类似数组的对象）提供的参数。


### 2. [call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
> #### func.call(this ,  arg1,  arg2 );

方法调用一个函数, 其具有一个指定的 this 值和分别地提供的参数( 参数的列表 )。

### 3. [bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
> #### fun.bind(this[, arg1[, arg2[, ...]]])

方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

---

以上解释来自于 MDN 的解释，从上面的内容我们可以看出:

1. 他们都是 function 下的方法;
2. 他们的第一个参数都是 this ，希望 fun 的this指向有所改变;
