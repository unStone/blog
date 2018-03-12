# zepto浅析

## 一、 暴露全局对象

```
  var Zepto = (function() {
    return $
  })()

  window.Zepto = Zepto
  window.$ === undefined && (window.$ = Zepto)
```

## 二、 核心架构

```
  var Zepto = (function() {
    var $, zepto = {};
    $.trim = function(str) {
      return str == null ? '' : String.prototype.trim.call(str)
    }
    $ = function(selector, context) {
      return zepto.init(selector, context)
    }
    $.fn = {
      addClass: function(name) {
        //...
      }
      //...
    }
    zepto.Z.prototypr = Z.prototype = $.fn
    $.zepto = zepto
    return $
  })()
```

## 三、 框架的入口：zepto.init

```
  $ = function(selector, context){
      return zepto.init(selector, context)
  }
  zepto.init = function(selector, context) {
      var dom
      if (!selector) return zepto.Z() // 如果是$()或$("")则执行
      else if (typeof selector == 'string') { // 如果传入的是字符串
          selector = selector.trim() // 去除收尾空白符
          if (selector[0] == '<' && fragmentRE.test(selector)) // 如果传入的字符串是以<开头且符合HTML代码规则（用了正则表达式），即创建元素
              dom = zepto.fragment(selector, RegExp.$1, context), selector = null // 创建一个DOM对象
          else if (context !== undefined) return $(context).find(selector) // 这里其实是一种讨巧的办法，我相信jQuery中肯定不会这么写，目的是实现在指定范围内查找[context]元素
          else dom = zepto.qsa(document, selector) // 调用zepto.qsa解析字符串，返回一个DOM数组
      }
      else if (isFunction(selector)) return $(document).ready(selector) // 很简单，如果是函数，则在文档就绪后执行
      else if (zepto.isZ(selector)) return selector // 如果是一个zepto对象，直接返回
      else {
          if (isArray(selector)) dom = compact(selector) // 如果是数组，调用compact返回一个数组，最后经Z变成类数组对象，我想这里是把几个DOM对象作为数组的参数传入，返回一个类数组对象
          else if (isObject(selector)) // 如果是一个对象，将其包含在数组之内，如p = document.getElementById("#p");$(p);
              dom = [selector], selector = null
          else if (fragmentRE.test(selector)) // 不知道是干嘛的
              dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
          else if (context !== undefined) return $(context).find(selector)
          else dom = zepto.qsa(document, selector)
      }
      return zepto.Z(dom, selector) // 可以看这里，无论以上过程经历了什么，都要经过此函数，目的是将数组转化为类数组对象。
  }
  zepto.Z = function(dom, selector) {
      return new Z(dom, selector)
  }
  /**
  * 一个构造函数，将dom对象中的属性和方法都复制到this下，并添加了两个属性，length和selector，这个函数的目的是将DOM对象转化为供zepto使用的类数组对象
  */
  function Z(dom, selector) {
      var i, len = dom ? dom.length : 0
      for (i = 0; i < len; i++) this[i] = dom[i]
      this.length = len
      this.selector = selector || ''
  }
  zepto.fragment = function(html, name, properties) {
      // 这里的代码就不展开了，其作用是返回一个DOM对象，若$()中传入第二个参数，则将其属性添加给创建的DOM对象
      return dom
  }
  zepto.qsa = function(element, selector){
      // 这里也不展开代码，又兴趣的可以直接看源码，很简单，无非是根据传入的选择符分别调用getElementByID、getElementsByTagName、getElementsByClassName、querySelectorAll等方法，返回一个数组，数组的值即是DOM对象，这就是最核心的选择器，有点坑爹。
  }
```