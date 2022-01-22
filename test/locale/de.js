'use strict';

var de = require('../../locale/de');
var t = require('../util').inWordsTest.bind(null, de);

describe('de', function () {
  t(0, 'null');
  t(1, 'eins');
  t(10, 'zehn');
  t(11, 'elf');
  t(12, 'zwölf');
  t(13, 'dreizehn');
  t(16, 'sechzehn');
  t(17, 'siebzehn');
  t(18, 'achtzehn');
  t(19, 'neunzehn');
  t(20, 'zwanzig');
  t(30, 'dreißig');
  t(60, 'sechzig');
  t(70, 'siebzig');
  t(100, 'einhundert');
  t(101, 'einhunderteins');
  t(600, 'sechshundert');
  t(700, 'siebenhundert');
  t(10000, 'zehntausend');
  t(700003, 'siebenhunderttausenddrei');
  t(427534, 'vierhundertsiebenundzwanzigtausendfünfhundertvierunddreißig');
  t(999999, 'neunhundertneunundneunzigtausendneunhundertneunundneunzig');
  t(1000000, 'eine Million');
  t(101000000, 'einhunderteine Million');
  t(201000000, 'zweihunderteine Million');
  t(2200000, 'zwei Millionen zweihunderttausend');
  t(1234678901, 'eine Milliarde zweihundertvierunddreißig Millionen ' +
    'sechshundertachtundsiebzigtausendneunhunderteins');
  t(1000000000000, 'eine Billion');
  t(2001000000000, 'zwei Billionen eine Milliarde');
  t(2001234678901, 'zwei Billionen eine Milliarde zweihundertvierunddreißig ' +
    'Millionen sechshundertachtundsiebzigtausendneunhunderteins');
  t(10000000000000, 'zehn Billionen');
  t(100000000000000, 'einhundert Billionen');
  t(1000000000000000, 'eine Billiarde');
  t(2000000000000000, 'zwei Billiarden');
  t(1000000000000000000, 'eine Trillion');
  t(2000000000000000000, 'zwei Trillionen');
  t('1000000000000000000000', 'eine Trilliarde');
  t('2000000000000000000000', 'zwei Trilliarden');
  t('1000000000000000000000000', 'eine Quadrillion');
  t('2000000000000000000000000', 'zwei Quadrillionen');
  t('1000000000000000000000000000', 'eine Quadrilliarde');
  t('2000000000000000000000000000', 'zwei Quadrilliarden');
});
