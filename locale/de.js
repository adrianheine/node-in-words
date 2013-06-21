// FIXME: Use strings
// FIXME: Bigger numbers
module.exports = function inWords(val, j) {
  function join(a, joiner, b) {
    var ret = a;
    if (a && b) {
      ret += joiner;
    }
    ret += b;
    return ret;
  }

  if (val < 13) {
    return {
       0: j && (j.before || j.after) ? '' : 'null',
       1: j && j.after ? 'ein' : 'eins',
       2: 'zwei',
       3: 'drei',
       4: 'vier',
       5: 'fünf',
       6: j && j.after === 'zehn' ? 'sech' : 'sechs',
       7: j && j.after === 'zehn' ? 'sieb' : 'sieben',
       8: 'acht',
       9: 'neun',
      10: 'zehn',
      11: 'elf',
      12: 'zwölf'
    }[val];
  } else if (val < 100) {
    return join(inWords(val % 10, {after: val < 20 ? 'zehn' : true}), val > 20 ? 'und' : '', {
      1: 'zehn',
      2: 'zwanzig',
      3: 'dreißig',
      4: 'vierzig',
      5: 'fünfzig',
      6: 'sechzig',
      7: 'siebzig',
      8: 'achtzig',
      9: 'neunzig'
    }[Math.floor(val / 10)]);
  } else if (val < 1000) {
    return inWords(Math.floor(val / 100), {after: true}) + 'hundert' + inWords(val % 100, {before: true});
  } else if (val < 1000000) {
    return inWords(Math.floor(val / 1000), {after: true}) + 'tausend' + inWords(val % 1000, {before: true});
  } else {
    throw new Error('too big');
  }
};
