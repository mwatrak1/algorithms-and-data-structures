function match(text, pattern) {

  for (var i = 0; i < text.length; i++) {
    var count = 0;

    for (var j = 0; j < pattern.length; j++) {
      if (pattern[j] == text[i + j]) {
        count++;
      }
    }
    if (count == pattern.length) {
      return i;
    }
    count = 0;
  }
  
  return -1;
}

console.log(match("Ala ma kota", "kot"));

