'use strict';

var utils = require('../utils');

var particles = require('../particles');
var P = particles.Particle;
var Particles = particles.Particles;

function splitInWords(pos, joiner, val) {
  return utils.splitHandle({
    cutOffLowest: pos,
    join: function (higher, lower) {
      return Particles(higher, joiner, lower);
    },
    handleParts: function (v) {
      return Particles(P(' ').asPrefix(), _inWords(v));
    }
  }, val);
}

var lessThanHundred = (function () {
  var atoms = {
     0: P('zero').hides('after', '*').hides('before', '*'),
     1: P('one').mutates('before', 'ty', 'te'),
     2: P('two').mutates('before', 'ty', 'twen'),
     3: P('three').mutates('before', 'teen', 'thir').mutates('before', 'ty', 'thir'),
     4: P('four').mutates('before', 'ty', 'for'),
     5: P('five').mutates('before', 'teen', 'fif').mutates('before', 'ty', 'fif'),
     6: 'six',
     7: 'seven',
     8: P('eight').mutates('before', 'ty', 'eigh'),
     9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve'
  };

  var tenDash = P('-').asJoiner();
  var tenTy = P('ty').asSuffix().mutates('after', 'one', 'en');

  var buildLessThanHundred = function (v) {
    var lt21 = v < 21;
    return utils.splitHandle({
      cutOffLowest: 1,
      join: function (ten, single) {
        var tenPs = Particles(ten, tenTy);
        return lt21 ? Particles(single, tenPs) : Particles(tenPs, tenDash, single);
      },
      handleParts: _inWords
    }, v);
  };
  return utils.withOverrides.bind(null, atoms, buildLessThanHundred);
}());

// FIXME: Bigger numbers
var handlers = (function () {
  var h = [
    {d: 2, h: lessThanHundred},
    {d: 3, h: ' hundred'},
    {d: 6, h: ' thousand'},
    {d: 9, h: ' million'}
  ];
  var handlers = {
    max: h[h.length - 1].d
  };
  for (var i = 0; i < h.length; ++i) {
    if (typeof h[i].h !== 'function') {
       h[i].h = splitInWords.bind(null, h[i-1].d, P(h[i].h).asSuffix());
    }
    handlers[h[i].d] = h[i].h;
  }
  return handlers;
}());

function _inWords(val) {
  return utils.firstPropFrom(handlers, val.length)(val);
}

function inWords(val) {
  val = String(val);
  if (val.length > inWords.max) {
    throw new Error('too big');
  }
  // FIXME: Should not be here
  return String(_inWords(val)).replace(/^\s+/, '').replace(/ {2}/g, ' ');
}
inWords.max = handlers.max;

module.exports = inWords;
