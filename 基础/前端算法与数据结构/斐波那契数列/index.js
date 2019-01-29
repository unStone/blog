// 在数学上，斐波纳契数列以如下被以递推的方法定义：F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）

function fibonacciSequence(a, b, n) {
  const arr = [a, b]
  if(n <= 2) {
    return arr[n - 1]
  }
  for(let i = 3; i <= n; i++) {
    arr[i - 1] = arr[i - 2] + arr[i - 3]
  }
  return arr[n - 1]
}