/*global describe: false, it: false*/

'use strict';

var assert = require('assert');

var particles = require('../particles');
var Particle = particles.Particle;
var Particles = particles.Particles;

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
});

describe('Particles', function () {
  it('yields nothing when a shy particle meets a suffix', function () {
    var wp = Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var suffix = Particle('suffix').asSuffix();
    var ps = Particles(wp, suffix);
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
  it('supports a getMembers method', function () {
    var p1 = Particle('');
    var p2 = Particle('');
    assert.deepEqual(Particles([p1, p2]).getMembers(), [p1, p2]);
  });
});
