/*
 * Based on  https://github.com/exu/slownie.js
 */

'use strict';

var utils = require('../utils');

var particles = require('../particles');
var P = particles.Particle;
var Particles = particles.Particles;

var joinSpace = P(' ').hides('before', '').hides('after', '');

var lessThanHundred = (function () {
  var atoms = {
     0: P('zero').hides('after', '*').hides('before', '*'),
     1: P('jeden').mutates('before', 'dziesiąt', 'na') // FIXME joining thing
      .mutates('before', 'naście', 'jede'),
     2: P('dwa').mutates('before', 'set', 'dwie'),
     3: 'trzy',
     4: P('cztery').mutates('before', 'naście', 'czter')
      .mutates('before', 'dziesiąt', 'czter'),
     5: P('pięć').mutates('before', 'naście', 'pięt'),
     6: P('sześć').mutates('before', 'naście', 'szes'),
     7: 'siedem',
     8: 'osiem',
     9: P('dziewięć').mutates('before', 'dziesiąt', 'dziewiec')
      .mutates('before', 'set', 'dziewięc')
      .mutates('before', 'naście', 'dziewięt'),
    10: 'dziesięc'
  };

  var tenDziesiat = P('dziesiąt').asSuffix()
    .mutates('after', 'jeden', 'ście')
    .mutates('after', 'dwa', 'dzieścia')
    .mutates('after', 'trzy', 'dzieści')
    .mutates('after', 'cztery', 'dzieści');

  var buildLessThanHundred = function (v) {
    return utils.splitHandle({
      cutOffLowest: 1,
      join: function (ten, single) {
        var tenPs = Particles(ten, tenDziesiat);
        return Particles(v < 20 ? [single, tenPs] : [tenPs, joinSpace, single]);
      },
      handleParts: _inWords
    }, v);
  };
  return utils.withOverrides.bind(null, atoms, buildLessThanHundred);
}());

var createBiggie = (function () {
  var JEDEN_SOLO = 'JEDENSOLO';

  return function (pos, opts) {
    var joiner;

    if (typeof opts === 'string') {
      opts = {
        jeden: opts,
        other: ' ' + opts + 'ów',

        'dwa': ' ' + opts + 'y',
        'trzy': ' ' + opts + 'y',
        'cztery': ' ' + opts + 'y'
      };
    }

    joiner = P(opts.other).mutates('after', JEDEN_SOLO, opts.jeden);
    joiner = [ 'dwa', 'trzy', 'cztery' ].reduce(function (p, otherP) {
      return p.mutates('after', otherP, opts[otherP]);
    }, joiner);

    return function (val) {
      return utils.splitHandle({
        cutOffLowest: pos,
        join: function (higher, lower) {
          // jeden is left out if it is the only number before the biggie
          if (String(higher).match(/^\s*jeden\s*$/)) {
            return Particles(joiner.toString(' ', JEDEN_SOLO), joinSpace, lower);
          }

          // This has been really difficult because 1000 (tysięcy) needs to react
          // on the previous particle but also has to check on the total
          // higher particles, since it is a suffix.

          // FIXME: Will fail pretty soon on JS’ Unicode RegExp issues wrt \b
          if (higher instanceof Particles) {
            higher = higher.toString().split(/\b/);
          } else {
            higher = [ higher ];
          }
          return Particles(higher.concat([joiner.asSuffix(), joinSpace, lower]));
        },
        handleParts: _inWords
      }, val);
    };
  };
}());

var handlers = (function () {
  var h = [
    {d: 2, h: lessThanHundred},
    {d: 3, h: {
      jeden: 'sto',
      other: 'set',

      'dwa': 'ście',
      'trzy': 'sta',
      'cztery': 'sta'
    }},
    {d: 6, h: {
      jeden: 'tysiąc',
      other: ' tysięcy',

      'dwa': ' tysiące',
      'trzy': ' tysiące',
      'cztery': ' tysiące'
    }},
  ];
  var n = 6;
  [ 'milion', 'miliard', 'bilion', 'biliard', 'trylion', 'tryliard',
    'kwadrylion' ].forEach(function (p) {
    h.push({d: n+=3, h: p});
  });
  var handlers = {
    max: h[h.length - 1].d
  };
  for (var i = 0; i < h.length; ++i) {
    if (typeof h[i].h !== 'function') {
       h[i].h = createBiggie(h[i-1].d, h[i].h);
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
