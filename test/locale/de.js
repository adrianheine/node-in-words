var assert = require('assert');

var de = require('../../locale/de');

function t(number, string) {
  it('gives the correct result for ' + number, function () {
    assert.equal(de(number), string);
  });
}

describe('de', function () {
  t(0, 'null');
  t(1, 'eins');
  t(11, 'elf');
  t(12, 'zwölf');
  t(13, 'dreizehn');
  t(16, 'sechzehn');
  t(17, 'siebzehn');
  t(30, 'dreißig');
  t(60, 'sechzig');
  t(70, 'siebzig');
  t(100, 'einhundert');
  t(600, 'sechshundert');
  t(700, 'siebenhundert');
  t(10000, 'zehntausend');
  t(427534, 'vierhundertsiebenundzwanzigtausendfünfhundertvierunddreißig');
  t(999999, 'neunhundertneunundneunzigtausendneunhundertneunundneunzig');
});
