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

<div class="container"></div>
```

### BFC（边距重叠解决办法）

  - 基本概念:
    - 块级格式化上下文
  - 原理:
    1. BFC垂直方向边距发生重叠。
    2. BFC的区域不会与浮动元素的box重叠。
    3. BFC是独立的元素，内外不会互相影响。
    4. 计算BFC高度时浮动元素也会参与计算。
  - [如何创建BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context):
    - 根元素或包含根元素的元素
    - 浮动元素（元素的 float 不是 none）
    - 绝对定位元素（元素的 position 为 absolute 或 fixed）
    - 行内块元素（元素的 display 为 inline-block）
    - 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
    - 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
    - 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
    - overflow 值不为 visible 的块元素
    - display 值为 flow-root 的元素
    - contain 值为 layout、content或 strict 的元素
    - 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
    - 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
    - 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
    - column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）

### IFC
  基本概念：内联格式化上下文