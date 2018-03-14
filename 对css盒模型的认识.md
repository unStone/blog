# 对css盒模型的认识

## 基本概念

由内到外： content -> padding -> border -> margin

## 扩展

###  标准模型与IE魔性的区别

1. 标准模型
  宽高只是content的宽高.


2. IE模型
  宽高包括content、paading、border。

### css如何设置这两种模型
1. 标准模型
  如何设置：box-sizing: content-box


2. IE模型
  如何设置：box-sizing: border-box 

### js如何设置盒模型对应的宽和高
只能取内联的样式：            dom.style.width/height
IE专用（渲染后的宽高）：       dom.currentStyle.width/height
兼容谷歌和火狐（渲染后的宽高）： window.getComputedStyle(dom).width/height
可以拿到元素四个顶点的位置：     dom.getBoundingClientRect()

### 根据盒模型解释边距重叠
``` html
.parent {
  background-color: brown;
  overflow: hidden;
}
.child {
  height: 100px;
  background-color: antiquewhite;
  margin-top: 10px;
}

<div class="parent">
  <div class="child"></div>
</div>
```

``` html
.container {
  margin-top: 20px;
  margin-bottom: 30px;
}

<div class="container">
  
</div>
```

### BFC（边距重叠解决办法）
  基本概念: 块级格式化上下文
  原理:
    1. BFC垂直方向边距发生重叠。
    2. BFC的区域不会与浮动元素的box重叠。
    3. BFC是独立的元素，内外不会互相影响。
    4. 计算BFC高度时浮动元素也会参与计算。
  如何创建BFC:
    1. float值不为none;
    2. position值不是static和relative;
    3. display为table类型的，例如table、table-cell、table-column、table-row。
    4. overflow不为visible;
  使用场景:

### IFC
  基本概念：内联格式化上下文