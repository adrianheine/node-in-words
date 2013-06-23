// FIXME: Bigger numbers

function withOverrides(overrides, algo, val) {
  if (overrides.hasOwnProperty(val)) {
    return overrides[val];
  }
  return algo(val);
}

function join(joiner, a, b) {
  var ret = a;
  if (a) {
    ret += joiner;
  }
  ret += b;
  return ret;
}

function splitHandle(pos, joiner, h1, h2, val) {
  pos = val.length - pos;
  return joiner(h1(val.substr(0, pos)), h2(val.substr(pos)));
}

function splitInWords(pos, joiner, val, j) {
  return splitHandle(pos, join.bind(null, joiner), function (v) {
    return inWords(v, {after: true});
  }, function (v) {
    return inWords(v, {before: true});
  }, val);
}

function tenner(val, j) {
  return withOverrides({
     0: (j.before || j.after) ? '' : 'null',
     1: j.after ? 'ein' : 'eins',
     2: 'zwei',
     3: 'drei',
     4: 'vier',
     5: 'fünf',
     6: j.after === 'zehn' ? 'sech' : 'sechs',
     7: j.after === 'zehn' ? 'sieb' : 'sieben',
     8: 'acht',
     9: 'neun',
    10: 'zehn',
    11: 'elf',
    12: 'zwölf'
  }, function (val) {
    var lt20 = val < 20;
    return splitHandle(1, function (a, b) {
      return join(lt20 ? '' : 'und', b, a);
    }, withOverrides.bind(null, {
      1: 'zehn',
      2: 'zwanzig',
      3: 'dreißig',
    }, function (val) {
      return join('zig', inWords(val, {after: 'zehn'}), '');
    }), function (v) {
      return inWords(v, {after: lt20 ? 'zehn' : true, before: j.before});
    }, val);
  }, val);
}

var handlers = (function () {
  var h = [
    {d: 2, h: tenner},
    {d: 3, h: 'hundert'},
    {d: 6, h: 'tausend'},
  ];
  var handlers = {};
  for (var i = 0; i < h.length; ++i) {
    if (typeof h[i].h !== 'function') {
      h[i].h = splitInWords.bind(null, h[i-1].d, h[i].h);
    }
    handlers[h[i].d] = h[i].h;
  }
  handlers.max = h[h.length - 1].d;
  return handlers;
}());

function inWords(val, j) {
  val = String(val);
  j = j || {};

  var i;
  for (i = val.length; i <= handlers.max; ++i) {
    if (handlers.hasOwnProperty(i)) {
      return handlers[i](val, j);
    }
  }
  throw new Error('too big');
};

module.exports = inWords;
