'use strict';

function Particle(particle) {
  if (!(this instanceof Particle)) {
    return new Particle(particle);
  }
  Object.defineProperty(this, 'id', { value: particle });
}

Particle.prototype = {
  toString: function () {
    return this.id;
  },
  toSource: function () {
    return 'P("' + this.id + '")';
  }
};

Particle.addMod = function (name, toStringGenerator) {
  Particle.prototype[name] = function (/* ... */) {
    var superToString = this.toString;
    var newP = Object.create(this);
    var toString = toStringGenerator.apply(newP, arguments);
    Object.defineProperty(newP, 'toString', { value: function (_after, _before) {
      if (arguments.length === 0) {
        return Particle.prototype.toString.apply(this);
      }
      var _ret = toString.apply(this, arguments);
      return (typeof _ret !== 'undefined') ? _ret : superToString.apply(this, arguments);
    }});
    return newP;
  };
};

function contextMatches(where, when, after, before) {
  var val = {
    before: after,
    after: before
  }[where];
  return (when === (val || '') || (when === '*' && typeof val !== 'undefined'));
}

Particle.addMod('mutates', function (mutatesWhere, mutatesWhen, mutatesTo) {
  return function (after, before) {
    if (contextMatches(mutatesWhere, mutatesWhen, after, before)) {
      return mutatesTo;
    }
  };
});

Particle.addMod('looses', function (loosesWhere, loosesWhen, loosesHowMuch) {
  var oldToString = this.toString;
  return function (after, before) {
    var v;
    if (contextMatches(loosesWhere, loosesWhen, after, before)) {
      v = oldToString.apply(this, arguments);
      return v.substr(0, v.length - loosesHowMuch);
    }
  };
});

Particle.addMod('asSuffix', function () {
  return function (after, before) {
    if (!before) return '';
  };
});

Particle.addMod('asPrefix', function () {
  return function (after, _before) {
    if (!after) return '';
  };
});

Particle.addMod('asJoiner', function () {
  return function (after, before) {
    if (!after || !before) return '';
  };
});

Particle.addMod('hides', function (hidesWhere, hidesWhen) {
  return function (after, before) {
    if (contextMatches(hidesWhere, hidesWhen, after, before)) {
      return '';
    }
  };
});

function psToSource(ps) {
  return ps.map(function (p) {
    return p.toSource ? p.toSource() : ('String("' + String(p) + '")');
  }).join(', ');
}

function conditionalToString(p, k, ps) {
  return p && p.toString(ps[k+1] && String(ps[k+1]), ps[k-1] && String(ps[k-1]));
}

function Particles(ps) {
  if (arguments.length > 1) {
    ps = Array.prototype.slice.call(arguments);
  }
  if (!(this instanceof Particles)) {
    return new Particles(ps);
  }

  this.toString = function () {
    if (typeof this._string === 'undefined') {
      var f_ps = [];
      var prev = null;
      for (var k = 0; k < ps.length; ++k) {
        var p = ps[k];
        if (p && p.toString(ps[k+1] && String(ps[k+1]), prev && String(prev))) {
          f_ps.push(p);
          prev = p;
        } else {
          prev = null;
        }
      }
      this._string = f_ps.map(conditionalToString).join('');
    }
    return this._string;
  };

  this.toSource = function () {
    return 'Ps([' + psToSource(ps) + '])';
  };
}

function Words(ps) {
  if (arguments.length > 1) {
    ps = Array.prototype.slice.call(arguments);
  }
  if (!(this instanceof Words)) {
    return new Words(ps);
  }

  this.toString = function () {
    if (typeof this._string === 'undefined') {
      var f_ps = [];
      var prev = null;
      for (var k = 0; k < ps.length; ++k) {
        var p = ps[k];
        if (p && p.toString(ps[k+1] && String(ps[k+1]), prev && String(prev))) {
          f_ps.push(p);
          prev = p;
        } else {
          prev = null;
        }
      }
      this._string = f_ps.map(conditionalToString).join(' ');
    }
    return this._string;
  };

  this.toSource = function () {
    return 'Ws([' + psToSource(ps) + '])';
  };
}

exports.Particles = Particles;
exports.Particle = Particle;
exports.Words = Words;
