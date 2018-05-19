# 用css解决移动端300ms延迟

在看 ant-design 源码时无意间发现了一个css方法
```
  touch-action: manipulation;
```

[属性介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action)

其实这个的作用是禁止双击缩放的功能，从而杜绝了移动端300ms延迟

[兼容性还可以](https://caniuse.com/#search=touch-action)