# 写一个new函数

```js
var new2 = function(fun) {
  var o = Object.creat(fun.prototype)
  var k = fun.call(o);

  if (typeof k === 'object') return k
  return o
}

```