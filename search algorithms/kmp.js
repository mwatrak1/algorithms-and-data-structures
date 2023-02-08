function knp(text, pattern) {
  let currentPatternIndexHit = 0;
  const patternLength = pattern.length;
  const textLength = text.length;

  if (patternLength > textLength) {
    return - 1;
  }

  for (i = 0; i < text.length; i++) {
    if (text[i] === pattern[currentPatternIndexHit]) {
      currentPatternIndexHit++;
    } else {
      currentPatternIndexHit = 0;
    }

    if (currentPatternIndexHit === patternLength) {
      return i - patternLength + 1;
    }
  }

  return -1;
}

console.log(knp("Ala ma kota", "kot"));