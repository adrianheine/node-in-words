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

Particle.addMod = function (name, handler) {
  Particle.prototype[name] = function () {
    var newP = Object.create(this);
    var oldToString = newP.toString;
    var toString = handler.apply(this, arguments);
    newP.toString = function (after, before) {
      if (arguments.length === 0) {
        return Particle.prototype.toString.call(this);
      }
      var _ret = toString.apply(this, arguments);
      return (typeof _ret !== 'undefined') ? _ret : oldToString.apply(this, arguments);
    };
    return newP;
  };
};

Particle.addMod('mutates', function (mutatesWhere, mutatesWhen, mutatesTo) {
  return function (after, before) {
    var val = {
      before: after,
      after: before
    }[mutatesWhere];
    val = val || '';
    if (mutatesWhen === val || mutatesWhen === '*') {
      return mutatesTo;
    }
  };
});

Particle.addMod('looses', function (loosesWhere, loosesWhen, loosesHowMuch) {
  return function (after, before) {
    var val = {
      before: after,
      after: before
    }[loosesWhere];
    val = val || '';
    if (loosesWhen === val || loosesWhen === '*') {
      return this.id.substr(0, this.id.length - loosesHowMuch);
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
    var val = {
      before: after,
      after: before
    }[hidesWhere];
    val = val || '';
    if (hidesWhen === val || hidesWhen === '*') {
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
  this.toString = function () {
    var _ps = ps.filter(function (p, k) {return p && p.toString(ps[k+1] && String(ps[k+1]), ps[k-1] && String(ps[k-1]));})
    _ps = _ps.map(function (p, k) { return p.toString(_ps[k+1] && String(_ps[k+1]), _ps[k-1] && String(_ps[k-1])); })
    return _ps.join('');
  };
};

exports.Particles = Particles;
exports.Particle = Particle;
