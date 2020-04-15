function fisherYates (arr) {
  if(!Array.isArray(arr)) return false;
  if(arr.length < 2) return arr;
  const newArr = [];

  for(let i=arr.length; i>0; i--) {
    const j = Math.floor(Math.random() * i)
    const n = arr[j];
    const last = arr.pop()
    arr.splice(j, 1, last)
    newArr.unshift(n)
  }
  return newArr;
}

// console.log(fisherYates(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']))
test_shuffle(fisherYates)
/**
* 用于验证 shuffle 方法是否完全随机
*/
function test_shuffle(shuffleFn) {
  // 多次乱序数组的次数
  let n = 100000; 
  // 保存每个元素在每个位置上出现的次数
  let countObj = {
      a:Array.from({length:10}).fill(0),
      b:Array.from({length:10}).fill(0),
      c:Array.from({length:10}).fill(0),
      d:Array.from({length:10}).fill(0),
      e:Array.from({length:10}).fill(0),
      f:Array.from({length:10}).fill(0),
      g:Array.from({length:10}).fill(0),
      h:Array.from({length:10}).fill(0),
      i:Array.from({length:10}).fill(0),
      j:Array.from({length:10}).fill(0),
  }
  for (let i = 0; i < n; i ++) {
      let baseArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const arr = shuffleFn(baseArr);
      countObj.a[arr.indexOf('a')]++;
      countObj.b[arr.indexOf('b')]++;
      countObj.c[arr.indexOf('c')]++;
      countObj.d[arr.indexOf('d')]++;
      countObj.e[arr.indexOf('e')]++;
      countObj.f[arr.indexOf('f')]++;
      countObj.g[arr.indexOf('g')]++;
      countObj.h[arr.indexOf('h')]++;
      countObj.i[arr.indexOf('i')]++;
      countObj.j[arr.indexOf('j')]++;
  }
  console.table(countObj);
}