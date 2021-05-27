function insertionSort(l) {
  for (var i = 1; i < l.length; i++) {
    var current = l[i];

    for (var j = i - 1; j >= 0 && l[j] > current; j--) {
      l[j + 1] = l[j];
    }

    l[j + 1] = current;
  }

  return l;
}

console.log(insertionSort([19,8,13,39,30,46,21,31,37,20,7,27,4]))
