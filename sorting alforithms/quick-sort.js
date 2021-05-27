function quicksort(l, left=0, right=l.length-1) {
  if (left < right){
  let pivotIdx = pivot(l, left, right)

  quicksort(l, left, pivotIdx - 1)
  quicksort(l, pivotIdx + 1, right)
  }

  return l
}

function swap(l, i, j) {
  var temp = l[i]
  l[i] = l[j]
  l[j] = temp
}

function pivot(l, start=0, end=l.length) {
  let pivot = l[start]
  let swapIdx = start

  for (let i = start + 1; i< l.length; i++) {
    if (pivot > l[i]){
      swapIdx++
      swap(l, swapIdx, i)
    }
  }
  swap(l, start, swapIdx)
  return swapIdx
}

console.log(quicksort([4, 8, 2, 1, 5, 7, 6, 3]))