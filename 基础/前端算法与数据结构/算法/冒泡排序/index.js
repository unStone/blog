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