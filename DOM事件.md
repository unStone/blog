# DOM事件

### 基本概念（DOM事件的级别）
  DOM标准定义的级别

  1. DOM0 （直接在元素上跟方法或<div onclick="function(){}"></div>）
  `element.onclick = function(){}`

  2. DOM2（增加了addEventListener方法）
  `element.addEventListener('click', function(){}, false)`

  3. DOM3 (增加了事件类型)
  `element.addEventListener('keyup', function(){}, false)`


### DOM事件模型（捕获和冒泡）
  ⬇️ 捕获
  ⬆️ 冒泡

### DOM事件流
  三个阶段
  1. 捕获
  2. 目标阶段
  3. 冒泡

### 描述DOM事件捕获的具体流程
  获取html节点: `document.documentElement`
  捕获流程: window -> document -> html -> body -> ... -> 目标元素
  冒泡流程: 目标元素 —> ... -> body -> html -> document -> window

### Event对象的常见应用
  - event.preventDefault()  阻止默认行为
  - event.stopPropagation() 阻止冒泡
  - event.stopImmediatePropagation() 绑定多个事件，可成功阻止该绑定事件后面的其他事件
  ``` html
  <div id="click">click</div>

  <script>
    function click1(e) {
      console.log(1)
    };
    function click2(e) {
      console.log(2)
    };
    function click3(e) {
      e.stopImmediatePropagation()
      console.log(3)
    };
    function click4(e) {
      console.log(4)
    };
    var dom = document.getElementById('click');
    dom.addEventListener('click', click1, false);
    dom.addEventListener('click', click2, false);
    dom.addEventListener('click', click3, false);
    dom.addEventListener('click', click4, false);
  </script>
  ```
  - event.currentTarget 事件代理事父元素当前绑定的事件
  - event.target        事件代理事子元素的事件

  ``` html
  <div id="container">
    <div class="child"></div>
  </div>

  <script>
    var container = document.getElementById('container');
    container.addEventListener('click', container1, false);
    function container1(e) {
      console.log('currentTarget', e.currentTarget);
      console.log('target', e.target)
    }
  </script>
  ```
### 自定义事件|模拟事件

Event
``` js
  var eve = new Event('custom');
  el.addEventListren('custom', function(){
    console.log('custom')
  });
  el.dispatchEvent(eve);
```

CustomEvent
```js
  var a = new CustomEvent('custom', {a: 123});
  var dom = document.getElementById('most-visited');
  dom.addEventListener('custom', function(e, data) {
    console.log('custom', e, data)
  })
  dom.dispatchEvent(a)
```