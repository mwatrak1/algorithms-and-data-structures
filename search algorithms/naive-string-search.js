function match(word1, word2) {
  for (var i = 0; i < word1.length; i++) {
    var count = 0;
    var howmany;

    for (var j = 0; j < word2.length; i++) {
      if (word2[j] == word1[i + j]) count++;
    }
    if (count == word2.length) howmany++;
    count = 0;
  }
  console.log("Word found in a phrase " + howmany + " times");
}

match("Ala ma kota", "kot");
