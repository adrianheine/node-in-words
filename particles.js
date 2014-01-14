function Particle(particle) {
  if (!(this instanceof Particle)) {
    return new Particle(particle);
  }
  Object.defineProperty(this, 'id', { value: particle });
}

Particle.prototype = {
  toString: function () {
    return this.id;
  }
};

Particle.addMod = function (name, toStringGenerator) {
  Particle.prototype[name] = function (/* ... */) {
    var superToString = this.toString;
    var newP = Object.create(this);
    var toString = toStringGenerator.apply(newP, arguments);
    Object.defineProperty(newP, 'toString', { value: function (after, before) {
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
  val = val || '';
  return (when === val || when === '*');
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

Particle.addMod('hides', function (hidesWhere, hidesWhen) {
  return function (after, before) {
    if (contextMatches(hidesWhere, hidesWhen, after, before)) {
      return '';
    }
  };
});

function Particles(ps) {
  if (arguments.length > 1) {
    ps = Array.prototype.slice.call(arguments);
  }
  if (!(this instanceof Particles)) {
    return new Particles(ps);
  }

  function conditionalToString(p, k, ps) {
    return p && p.toString(ps[k+1] && String(ps[k+1]), ps[k-1] && String(ps[k-1]));
  }
  this.toString = function () {
    var _ps = ps.filter(conditionalToString);
    _ps = _ps.map(conditionalToString);
    return _ps.join('');
  };
};

exports.Particles = Particles;
exports.Particle = Particle;
