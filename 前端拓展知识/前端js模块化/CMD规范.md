# CMD 规范

## CMD 规范

[CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md) 推崇依赖就近、延迟执行。

## CMD 的优缺点

- CMD 优点：因为只有在使用的时候才会解析执行 js 文件，因此，每个 JS 文件的执行顺序在代码中是有体现的，是可控的。
- CMD 缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明