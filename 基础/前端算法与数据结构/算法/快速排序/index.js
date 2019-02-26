/**
 * 
 * */

var arr = [2, 3, 4, 1, 66, 34, 24, 66, 43]

function quickSort(array) {
  if(array.length <= 1) return array;
  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0];
  const leftArr = [];
  const rightArr = [];

  for(let i = 0; i < array.length; i++) {
    if(array[i] <= pivot) {
      leftArr.push(array[i])
    } else {
      rightArr.push(array[i])
    }
  }

  return quickSort(leftArr).concat([pivot], quickSort(rightArr))
}

console.log('quickSort', quickSort(arr))