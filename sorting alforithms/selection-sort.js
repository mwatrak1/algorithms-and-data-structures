function selectionSort(l) {
  var smallest
  for (let i = 0; i < l.length; i++){
    smallest = i
    for (let j = i + 1; j < l.length; j++){
      if (l[j] < l[smallest]){
        smallest = j
      }
    }
    if (smallest != i){
      let temp = l[i]
      l[i] = l[smallest]
      l[smallest] = temp
    }
  }
  return l
}

console.log(selectionSort([19,8,13,39,30,46,21,31,37,20,7,27,4]))