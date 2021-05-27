function bubbleSort(l){
  var swapped = true

  while(swapped) {
      swapped = false
      for (let i = 1; i < l.length; i++){
          if (l[i - 1] > l[i]){
              let temp = l[i - 1]
              l[i - 1] = l[i]
              l[i] = temp
              swapped = true
          }
      }
  }
  return l

}

console.log(bubbleSort([19,8,13,39,30,46,21,31,37,20,7,27,4]))