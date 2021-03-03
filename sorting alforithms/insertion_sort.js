function insertionSort(l) {
  for (var i = 1; i < l.length; i++) {
    var current = l[i];
    console.log(current);

    for (var j = i - 1; j >= 0 && l[j] > current; j--) {
      l[j + 1] = l[j];
    }

    l[j + 1] = current;
    console.log(l);
  }

  return l;
}

result = insertionSort([5, 3, 4, 1, 2, 8, 4, 2, 123]);

console.log(result);
