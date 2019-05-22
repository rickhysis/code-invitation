function minimalSwap(popularity){  
    var reversed = popularity.slice().sort((a, b) => b - a);
    var count = 0;
    var i = popularity.length;
    var p;

  while (i--) {
      if (popularity[i] === reversed[i]) 
        continue;
      p = popularity.indexOf(reversed[i]);
      [popularity[i], popularity[p]] = [popularity[p], popularity[i]];
      count++;
  }
  
  return count;
}

console.log(minimalSwap([3,3,1,2]))