function binary(arr, elem) {
  var start = 0;
  var end = arr.length - 1;
  middle = Math.floor((start + end) / 2);

  while (arr[middle] !== elem && start <= end) {
    console.log(start, middle, end);
    if (elem < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }

    middle = Math.floor((start + end) / 2);
  }
  console.log(start, middle, end);
  if (arr[middle] === elem) {
    return middle;
  } else {
    console.log("Number not found");
  }
}
