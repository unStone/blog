# class

## 如何class继承多个类

```js
var extends1 = base => class extends base {
  extends1() {}
}

var extends2 = base => class extends base {
 extends2() {}
}

class App extends extends1(extends2()) {
  
}
```