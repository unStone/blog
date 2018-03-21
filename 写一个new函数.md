# 写一个new函数

```js
var new2 = function (func) {
  var newObj = Object.create(func.prototype);
  var case = func.call(newObj);
  if (typeof newObj === 'object') return case;
  return newObj;
}
```