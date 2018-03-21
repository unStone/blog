
# fastclick原理

## 原理

在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend --》click。

fastclick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。

## 源码

```js
FastClick.prototype.onTouchEnd = function (event) {
  this.sendClick(targetElement, event);
  return false;
}
FastClick.prototype.sendClick = function(targetElement, event) {
  // ...

  // 创建一个 MouseEvents 事件
  clickEvent = document.createEvent('MouseEvents');
  /**
   * initMouseEvent 事件初始化
   * event.initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget);
   *
   * @param {type} 事件类型（click，mousedown，mouseup，mouseover，mousemove，mouseout）
   * @param {canBubble} 是否可以冒泡
   * @param {cancelable} 是否可以阻止事件默认行为
   * @param {view} 事件的AbstractView对象引用
   * @param {detail} 事件的鼠标点击数量
   * @param {screenX} 事件的屏幕的x坐标
   * @param {screenY} 事件的屏幕的y坐标
   * @param {clientX} 事件的客户端x坐标
   * @param {clientY} 事件的客户端y坐标
   * @param {ctrlKey} 事件发生时 control 键是否被按下
   * @param {altKey} 事件发生时 alt 键是否被按下
   * @param {shiftKey} 事件发生时 shift 键是否被按下
   * @param {metaKey} 事件发生时 meta 键是否被按下
   * @param {button} 鼠标按键值 button
   * @param {relatedTarget} 事件的相关对象。只在某些事件类型有用 (例如 mouseover ?和 mouseout)。其它的传null。
   * 
   */ 
  clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  // fastclick的内部变量，用来识别click事件是原生还是模拟
  clickEvent.forwardedTouchEvent = true;
  // 在目标元素上触发该鼠标事件，
  targetElement.dispatchEvent(clickEvent);
};
```