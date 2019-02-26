/**
 * 每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 以此类推，直到全部待排序的数据元素排完。 选择排序是不稳定的排序方法。
 * */

var arr = [2, 3, 4, 1, 66, 34, 24, 66, 43]

function selectionSort (array) {
  let key = 0;
  let min = array[key];
  if(array.length <= 1) return array;

  for(let j = 1; j < array.length; j++) {
    if(array[j] < min) {
      key = j
      min = array[j]
    }
  }

  const ready = [min];
  array.splice(key, 1)

  return [].concat(ready, selectionSort(array))
}

console.log('selectionSort', selectionSort(arr))