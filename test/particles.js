/*global describe: false, it: false*/

'use strict';

var assert = require('assert');

var particles = require('../particles');
var Particle = particles.Particle;
var Particles = particles.Particles;
var Words = particles.Words;

describe('Particle', function () {
  describe('id', function () {
    var p = Particle('new id');
    it('is initialized to the constructor‘s argument', function () {
      assert.equal(p.id, 'new id');
    });
    it('is not writable', function () {
      try {
        p.id = 'another id';
      } catch (e) {
        // In strict mode, this throws a TypeError
        assert.ok(e instanceof TypeError);
      }
      // Even without a working strict mode, the id should be unchanged
      assert.equal(p.id, 'new id');
    });
  });
  describe('mutates', function () {
    var p = Particle('normal particle');
    var mp = p.mutates('after', 'radiation', 'mutated particle');
    it('returns a Particle', function () {
      assert(mp instanceof Particle);
    });
    it('does not alter the original particle', function () {
      assert.notEqual(p, mp);
    });
    it('does not mutate if the specified condition is not given', function () {
      assert.equal(mp.toString('', 'no radiation'), 'normal particle');
    });
    it('mutates under the specified condition', function () {
      assert.equal(mp.toString('', 'radiation'), 'mutated particle');
    });
  });
  describe('asJoiner', function () {
    var p = Particle('normal particle');
    var joiner = p.asJoiner();
    it('returns a Particle', function () {
      assert(joiner instanceof Particle);
    });
    it('does not alter the original particle', function () {
      assert.notEqual(p, joiner);
    });
    it('does not appear if at the beginning', function () {
      assert.equal(joiner.toString('', 'after'), '');
    });
    it('does not appear if at the end', function () {
      assert.equal(joiner.toString('before', ''), '');
    });
    it('appears if between something', function () {
      assert.equal(joiner.toString('before', 'after'), 'normal particle');
    });
  });
});

describe('Particles', function () {
  it('yields something when a particle meets a suffix', function () {
    var wp = Particle('particle');
    var suffix = Particle('suffix').asSuffix();
    var ps = Particles(wp, suffix);
    assert.equal(String(ps), 'particlesuffix');
  });
  it('yields something when a particle meets a prefix', function () {
    var wp = Particle('particle');
    var prefix = Particle('prefix').asPrefix();
    var ps = Particles(prefix, wp);
    assert.equal(String(ps), 'prefixparticle');
  });
  it('yields nothing when a shy particle meets a suffix', function () {
    var wp = Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var suffix = Particle('suffix').asSuffix();
    var ps = Particles(wp, suffix);
    assert.equal(String(ps), '');
  });
  it('yields nothing when a shy particle meets a prefix', function () {
    var wp = Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var prefix = Particle('prefix').asPrefix();
    var ps = Particles(prefix, wp);
    assert.equal(String(ps), '');
  });
  it('supports a joining particle', function () {
    var joining = Particle('join').mutates('after', '', '').mutates('before', '', '');
    assert.equal(String(Particles(joining, 'a')), 'a');
    assert.equal(String(Particles('a', joining)), 'a');
    assert.equal(String(Particles('a', joining, 'b')), 'ajoinb');
  });
  it('supports a mutating suffix', function () {
    var suffix = Particle('suffix').asSuffix().mutates('after', 'beetle', 'fix');
    var beetle = Particle('beetle').mutates('before', 'suffix', 'swee');
    assert.equal(String(Particles(beetle, suffix)), 'sweefix');
  });
  it('supports a mutating prefix', function () {
    var prefix = Particle('prefix').asPrefix().mutates('before', 'beetle', 'fix');
    var beetle = Particle('beetle').mutates('after', 'prefix', 'swee');
    assert.equal(String(Particles(prefix, beetle)), 'fixswee');
  });
  it('looses on the mutation', function () {
    var p = Particle('original')
      .mutates('before', 'suffix', 'mutated')
      .looses('before', '*', 1);
    var s = Particle('suffix');
    assert.equal(String(Particles(p, s)), 'mutatesuffix');
  });
  it('does not let an asterisk match an empty context', function () {
    var p = Particle('eins').looses('before', '*', '1');
    assert.equal(String(Particles([p])), 'eins');
  });
});

describe('Words', function () {
  it('yields something when a particle meets a suffix', function () {
    var wp = Particle('particle');
    var suffix = Particle('suffix').asSuffix();
    var ps = Words(wp, suffix);
    assert.equal(String(ps), 'particle suffix');
  });
  it('yields something when a particle meets a prefix', function () {
    var wp = Particle('particle');
    var prefix = Particle('prefix').asPrefix();
    var ps = Words(prefix, wp);
    assert.equal(String(ps), 'prefix particle');
  });
  it('yields nothing when a shy particle meets a suffix', function () {
    var wp = Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var suffix = Particle('suffix').asSuffix();
    var ps = Words(wp, suffix);
    assert.equal(String(ps), '');
  });
  it('yields nothing when a shy particle meets a prefix', function () {
    var wp = Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var prefix = Particle('prefix').asPrefix();
    var ps = Words(prefix, wp);
    assert.equal(String(ps), '');
  });
  it('supports a joining particle', function () {
    var joining = Particle('join').mutates('after', '', '').mutates('before', '', '');
    assert.equal(String(Words(joining, 'a')), 'a');
    assert.equal(String(Words('a', joining)), 'a');
    assert.equal(String(Words('a', joining, 'b')), 'a join b');
  });
  it('supports a mutating suffix', function () {
    var suffix = Particle('suffix').asSuffix().mutates('after', 'beetle', 'fix');
    var beetle = Particle('beetle').mutates('before', 'suffix', 'swee');
    assert.equal(String(Words(beetle, suffix)), 'swee fix');
  });
  it('supports a mutating prefix', function () {
    var prefix = Particle('prefix').asPrefix().mutates('before', 'beetle', 'fix');
    var beetle = Particle('beetle').mutates('after', 'prefix', 'swee');
    assert.equal(String(Words(prefix, beetle)), 'fix swee');
  });
  it('looses on the mutation', function () {
    var p = Particle('original')
      .mutates('before', 'suffix', 'mutated')
      .looses('before', '*', 1);
    var s = Particle('suffix');
    assert.equal(String(Words(p, s)), 'mutate suffix');
  });
  it('does not let an asterisk match an empty context', function () {
    var p = Particle('eins').looses('before', '*', '1');
    assert.equal(String(Words([p])), 'eins');
  });
});
