'use strict';

var utils = require('../utils');

var particles = require('../particles');
var P = particles.Particle;
var Particles = particles.Particles;

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
  var tenZig = P('zig').asSuffix()
    .mutates('after', 'drei', 'ßig')
    .mutates('after', 'eine', 'hn')
    .mutates('after', 'eins', 'hn');

  return function (val, params) {
    var _return = utils.withOverrides(atoms, function (val) {
      return utils.splitHandle({
        cutOffLowest: 1,
        join: function (ten, single) {
          return Particles(single, tenUnd, Particles(ten, tenZig));
        },
        handleParts: function (val) { return _inWords(val, params); }
      }, val);
    }, val);
    // FIXME: Make this knowledge part of the particle and
    // have Particle::toString react to an environment object
    if (params.gender === 'f' && String(_return) === 'eins') {
      _return = P('eine').mutates('before', 'zig', 'ze');
    }
    return _return;
  };
}());

var medium = function (joiner, pos) {
  joiner = P(joiner).asSuffix();
  return function (val, params) {
    return utils.splitHandle({
      cutOffLowest: pos,
      join: function (higher, lower) {
        return Particles(higher, joiner, lower);
      },
      handleHigherPart: function (val) {
        return _inWords(val, {});
      },
      handleLowerPart: function (val) {
        return _inWords(val, params);
      }
    }, val);
  };
};

var biggie = function (nounP, cutOff) {
  var biggieSpace = P(' ').hides('before', '');
  nounP = nounP.asSuffix();
  return function (val, params) {
    return utils.splitHandle({
      cutOffLowest: cutOff,
      join: function (higher, lower) {
        higher = String(higher);
        var res = [];
        // The big nouns need to know if they come after 'eine', so we split it off
        if (higher.substr(-4) === 'eine') {
          res = res.concat([ higher.substr(0, higher.length - 4), 'eine' ]);
        } else {
          res.push(higher);
        }
        res = res.concat([ nounP, biggieSpace, lower ]);
        return Particles(res);
      },
      handleHigherPart: function (val) {
        return _inWords(val, {gender: 'f'});
      },
      handleLowerPart: function (val) {
        return _inWords(val, params);
      }
    }, val);
  };
};

// FIXME: Bigger numbers
var handlers = (function () {
  var h = [
    {d: 2, h: lessThanHundred},
    {d: 3, h: medium.bind(null, 'hundert')},
    {d: 6, h: medium.bind(null, 'tausend')},
    {d: 9, h: biggie.bind(null, P(' Millionen').looses('after', 'eine', 2))},
    {d: 12, h: biggie.bind(null, P(' Milliarden').looses('after', 'eine', 1))},
    {d: 15, h: biggie.bind(null, P(' Billionen').looses('after', 'eine', 2))},
    {d: 18, h: biggie.bind(null, P(' Billiarden').looses('after', 'eine', 1))},
    {d: 21, h: biggie.bind(null, P(' Trillionen').looses('after', 'eine', 2))},
    {d: 24, h: biggie.bind(null, P(' Trilliarden').looses('after', 'eine', 1))},
    {d: 27, h: biggie.bind(null, P(' Quadrillionen').looses('after', 'eine', 2))},
    {d: 30, h: biggie.bind(null, P(' Quadrilliarden').looses('after', 'eine', 1))},
  ];
  var handlers = {
    max: h[h.length - 1].d
  };
  for (var i = 0; i < h.length; ++i) {
    handlers[h[i].d] = i > 0 ? h[i].h(h[i-1].d) : h[i].h;
  }
  return handlers;
}());

function _inWords(val, params) {
  return utils.firstPropFrom(handlers, val.length)(val, params);
}

function inWords(val, params) {
  val = String(val);
  if (val.length > inWords.max) {
    throw new Error('too big');
  }
  return String(_inWords(val, params || {}));
}
inWords.max = handlers.max;

module.exports = inWords;
