var assert = require('assert');

var particles = require('../particles');

describe('Particle', function () {
  describe('id', function () {
    var p = particles.Particle('new id');
    it('is initialized to the constructor‘s argument', function () {
      assert.equal(p.id, 'new id');
    });
    it('is not writable', function () {
      p.id = 'another id';
      assert.equal(p.id, 'new id');
    });
  });
  describe('mutates', function () {
    var p = particles.Particle('normal particle');
    var mp = p.mutates('after', 'radiation', 'mutated particle');
    it('returns a Particle', function () {
      assert(mp instanceof particles.Particle);
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
    var wp = particles.Particle('shy particle').looses('after','*', 12).looses('before', '*', 12);
    var suffix = particles.Particle('suffix').asSuffix();
    var ps = particles.Particles(wp, suffix);
    assert.equal(String(ps), '');
  });
  it('supports a joining particle', function () {
    var joining = particles.Particle('join').mutates('after', '', '').mutates('before', '', '');
    assert.equal(String(particles.Particles(joining, 'a')), 'a');
    assert.equal(String(particles.Particles('a', joining)), 'a');
    assert.equal(String(particles.Particles('a', joining, 'b')), 'ajoinb');
  });
  it('supports a mutating suffix', function () {
    var suffix = particles.Particle('suffix').asSuffix().mutates('after', 'beetle', 'fix');
    var beetle = particles.Particle('beetle').mutates('before', 'suffix', 'swee');
    assert.equal(String(particles.Particles(beetle, suffix)), 'sweefix');
  });
  it('looses on the mutation', function () {
    var p = particles.Particle('original').mutates('before', 'suffix', 'mutated').looses('before', '*', 1);
    var s = particles.Particle('suffix');
    assert.equal(String(particles.Particles(p, s)), 'mutatesuffix');
  });
});
