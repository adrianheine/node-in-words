var utils = require('../utils');

var particles = require('../particles');
var P = particles.Particle;
var Particles = particles.Particles;

function splitHandle(opts, val) {
  var pos = val.length - opts.cutOffLowest;
  return opts.join(opts.handleParts(val.substr(0, pos)), opts.handleParts(val.substr(pos)));
}

function splitInWords(pos, joiner, val) {
  return splitHandle({
    cutOffLowest: pos,
    join: function (higher, lower) {
      return Particles(higher, joiner, lower);
    },
    handleParts: _inWords
  }, val);
}

var lessThanHundred = (function () {
  var atoms = {
     0: P('null').hides('after', '*').hides('before', '*'),
     1: P('eins').looses('before', '*', 1).mutates('before', 'zig', 'ze'),
     2: P('zwei').mutates('before', 'zig', 'zwan'),
     3: 'drei',
     4: 'vier',
     5: 'fünf',
     6: P('sechs').looses('before', 'zehn', 1).looses('before', 'zig', 1),
     7: P('sieben').looses('before', 'zehn', 2).looses('before', 'zig', 2),
     8: 'acht',
     9: 'neun',
    11: 'elf',
    12: 'zwölf'
  };

  var tenUnd = P('und').hides('before', 'zehn').hides('after', '').hides('before', '');
  var tenZig = P('zig').asSuffix().mutates('after', 'drei', 'ßig').mutates('after', 'eins', 'hn');

  var buildLessThanHundred = splitHandle.bind(null, {
    cutOffLowest: 1,
    join: function (ten, single) {
      return Particles(single, tenUnd, Particles(ten, tenZig));
    },
    handleParts: _inWords
  });
  return utils.withOverrides.bind(null, atoms, buildLessThanHundred);
}());

// FIXME: Bigger numbers
var handlers = (function () {
  var h = [
    {d: 2, h: lessThanHundred},
    {d: 3, h: 'hundert'},
    {d: 6, h: 'tausend'}
  ];
  var handlers = {
    max: h[h.length - 1].d
  };
  for (var i = 0; i < h.length; ++i) {
    handlers[h[i].d] = (typeof h[i].h === 'function') ? h[i].h : splitInWords.bind(null, h[i-1].d, P(h[i].h).asSuffix());
  }
  return handlers;
}());

function _inWords(val) {
  return utils.firstPropFrom(handlers, val.length)(val);
};

function inWords(val) {
  val = String(val);
  if (val.length > inWords.max) {
    throw new Error('too big');
  }
  return String(_inWords(val));
};
inWords.max = handlers.max;

module.exports = inWords;
