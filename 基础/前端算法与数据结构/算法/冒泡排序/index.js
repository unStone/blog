/**
 * 冒泡排序算法的原理如下：
 * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 * 针对所有的元素重复以上的步骤，除了最后一个。
 * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * */

var arr = [2, 3, 4, 1, 66, 34, 24, 66, 43]

function bubbleSort1 (array) {
  const length = array.length;
  if(length <= 1) return array;
  for(let i = 0; i <= length - 2; i++) {
    let middle = null
    if(array[i] > array[i + 1]) {
      middle = array[i]
      array[i] = array[i + 1];
      array[i + 1] = middle
    }
  }

  const max = array.pop();
  const todoArr = array;
  return [].concat(bubbleSort1(todoArr), [max])
}

// console.log('bubbleSort', bubbleSort1(arr))

function bubbleSort2(array) {
  for(let j = 1; j < array.length; j++) {
    for(let i = 0; i < array.length - j; i++) {
      if(array[i] > array[i + 1]) {
        let a = array[i + 1];
        array[i + 1] = array[i];
        array[i] = a;
      }
    }
  }
  return array;
}

console.log('bubbleSort2', bubbleSort2(arr))