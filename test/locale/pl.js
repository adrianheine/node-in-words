'use strict';

var pl = require('../../locale/pl');
var t = require('../util').inWordsTest.bind(null, pl);

describe('pl', function () {

  t('0', 'zero');
  t('1', 'jeden');
  t('2', 'dwa');
  t('3', 'trzy');
  t('4', 'cztery');
  t('7', 'siedem');
  t('10', 'dziesięć');
  t('12', 'dwanaście');
  t('14', 'czternaście');
  t('17', 'siedemnaście');
  t('26', 'dwadzieścia sześć');
  t('30', 'trzydzieści');
  t('50', 'pięćdziesiąt');
  t('66', 'sześćdziesiąt sześć');
  t('93', 'dziewięćdziesiąt trzy');
  t('99', 'dziewięćdziesiąt dziewięć');
  t('141', 'sto czterdzieści jeden');
  t('156', 'sto pięćdziesiąt sześć');
  t('166', 'sto sześćdziesiąt sześć');
  t('270', 'dwieście siedemdziesiąt');
  t('346', 'trzysta czterdzieści sześć');
  t('396', 'trzysta dziewięćdziesiąt sześć');
  t('501', 'pięćset jeden');
  t('892', 'osiemset dziewięćdziesiąt dwa');
  t('1625', 'tysiąc sześćset dwadzieścia pięć');
  t('3135', 'trzy tysiące sto trzydzieści pięć');
  t('4839', 'cztery tysiące osiemset trzydzieści dziewięć');
  t('8420', 'osiem tysięcy czterysta dwadzieścia');
  t('11873', 'jedenaście tysięcy osiemset siedemdziesiąt trzy');
  t('15651', 'piętnaście tysięcy sześćset pięćdziesiąt jeden');
  t('26383', 'dwadzieścia sześć tysięcy trzysta osiemdziesiąt trzy');
  t('55042', 'pięćdziesiąt pięć tysięcy czterdzieści dwa');
  t('93345', 'dziewięćdziesiąt trzy tysiące trzysta czterdzieści pięć');
  t('127180', 'sto dwadzieścia siedem tysięcy sto osiemdziesiąt');
  t('197431', 'sto dziewięćdziesiąt siedem tysięcy czterysta trzydzieści ' +
    'jeden');
  t('303804', 'trzysta trzy tysiące osiemset cztery');
  t('700003', 'siedemset tysięcy trzy');
  t('758926', 'siedemset pięćdziesiąt osiem tysięcy dziewięćset dwadzieścia ' +
    'sześć');
  t('1288803', 'milion dwieście osiemdziesiąt osiem tysięcy osiemset ' +
    'trzy');
  t('2875823', 'dwa miliony osiemset siedemdziesiąt pięć tysięcy osiemset ' +
    'dwadzieścia trzy');
  t('6854604', 'sześć milionów osiemset pięćdziesiąt cztery tysiące sześćset ' +
    'cztery');
  t('16228285', 'szesnaście milionów dwieście dwadzieścia osiem tysięcy ' +
    'dwieście osiemdziesiąt pięć');
  t('43317234', 'czterdzieści trzy miliony trzysta siedemnaście tysięcy ' +
    'dwieście trzydzieści cztery');
  t('109158181', 'sto dziewięć milionów sto pięćdziesiąt osiem tysięcy sto ' +
    'osiemdziesiąt jeden');
  t('409093722', 'czterysta dziewięć milionów dziewięćdziesiąt trzy tysiące ' +
    'siedemset dwadzieścia dwa');
  t('1001000000', 'miliard milion');
  t('1644458481', 'miliard sześćset czterdzieści cztery miliony czterysta ' +
    'pięćdziesiąt osiem tysięcy czterysta osiemdziesiąt jeden');
  t('3074793073', 'trzy miliardy siedemdziesiąt cztery miliony siedemset ' +
    'dziewięćdziesiąt trzy tysiące siedemdziesiąt trzy');
  t('12166242023', 'dwanaście miliardów sto sześćdziesiąt sześć milionów ' +
    'dwieście czterdzieści dwa tysiące dwadzieścia trzy');
  t('27921921047', 'dwadzieścia siedem miliardów dziewięćset dwadzieścia ' +
    'jeden milionów dziewięćset dwadzieścia jeden tysięcy czterdzieści ' +
    'siedem');
  t('179946793412', 'sto siedemdziesiąt dziewięć miliardów dziewięćset ' +
    'czterdzieści sześć milionów siedemset dziewięćdziesiąt trzy tysiące ' +
    'czterysta dwanaście');
  t('538072047518', 'pięćset trzydzieści osiem miliardów siedemdziesiąt dwa ' +
    'miliony czterdzieści siedem tysięcy pięćset osiemnaście');
  t('3098492052366', 'trzy biliony dziewięćdziesiąt osiem miliardów ' +
    'czterysta dziewięćdziesiąt dwa miliony pięćdziesiąt dwa tysiące trzysta ' +
    'sześćdziesiąt sześć');
  t('25713771644907', 'dwadzieścia pięć bilionów siedemset trzynaście ' +
    'miliardów siedemset siedemdziesiąt jeden milionów sześćset czterdzieści ' +
    'cztery tysiące dziewięćset siedem');
  t('87407743736557', 'osiemdziesiąt siedem bilionów czterysta siedem ' +
    'miliardów siedemset czterdzieści trzy miliony siedemset trzydzieści ' +
    'sześć tysięcy pięćset pięćdziesiąt siedem');
  t('799262083749807', 'siedemset dziewięćdziesiąt dziewięć bilionów ' +
    'dwieście sześćdziesiąt dwa miliardy osiemdziesiąt trzy miliony ' +
    'siedemset czterdzieści dziewięć tysięcy osiemset siedem');
  t('8754785357174394', 'osiem biliardów siedemset pięćdziesiąt cztery ' +
    'biliony siedemset osiemdziesiąt pięć miliardów trzysta pięćdziesiąt ' +
    'siedem milionów sto siedemdziesiąt cztery tysiące trzysta ' +
    'dziewięćdziesiąt cztery');
  t('105840805681074130', 'sto pięć biliardów osiemset czterdzieści bilionów ' +
    'osiemset pięć miliardów sześćset osiemdziesiąt jeden milionów ' +
    'siedemdziesiąt cztery tysiące sto trzydzieści');
  t('230619049731682000', 'dwieście trzydzieści biliardów sześćset ' +
    'dziewiętnaście bilionów czterdzieści dziewięć miliardów siedemset ' +
    'trzydzieści jeden milionów sześćset osiemdziesiąt dwa tysiące');
  t('579266381582073600', 'pięćset siedemdziesiąt dziewięć biliardów ' +
    'dwieście sześćdziesiąt sześć bilionów trzysta osiemdziesiąt jeden ' +
    'miliardów pięćset osiemdziesiąt dwa miliony siedemdziesiąt trzy tysiące ' +
    'sześćset');
  t('5060365100686375000', 'pięć trylionów sześćdziesiąt biliardów trzysta ' +
    'sześćdziesiąt pięć bilionów sto miliardów sześćset osiemdziesiąt sześć ' +
    'milionów trzysta siedemdziesiąt pięć tysięcy');
  t('1643865203499258700000', 'tryliard sześćset czterdzieści trzy tryliony ' +
    'osiemset sześćdziesiąt pięć biliardów dwieście trzy biliony czterysta ' +
    'dziewięćdziesiąt dziewięć miliardów dwieście pięćdziesiąt osiem ' +
    'milionów siedemset tysięcy');
  t('16438652034992587000000', 'szesnaście tryliardów czterysta trzydzieści ' +
    'osiem trylionów sześćset pięćdziesiąt dwa biliardy trzydzieści cztery ' +
    'biliony dziewięćset dziewięćdziesiąt dwa miliardy pięćset osiemdziesiąt ' +
    'siedem milionów');
  t('164386520349925870000000', 'sto sześćdziesiąt cztery tryliardy trzysta ' +
    'osiemdziesiąt sześć trylionów pięćset dwadzieścia biliardów trzysta ' +
    'czterdzieści dziewięć bilionów dziewięćset dwadzieścia pięć miliardów ' +
    'osiemset siedemdziesiąt milionów');
  t('1643865203499258700000000', 'kwadrylion sześćset czterdzieści trzy ' +
    'tryliardy osiemset sześćdziesiąt pięć trylionów dwieście trzy biliardy ' +
    'czterysta dziewięćdziesiąt dziewięć bilionów dwieście pięćdziesiąt ' +
    'osiem miliardów siedemset milionów');
  t('16438652034992587000000000', 'szesnaście kwadrylionów czterysta ' +
    'trzydzieści osiem tryliardów sześćset pięćdziesiąt dwa tryliony ' +
    'trzydzieści cztery biliardy dziewięćset dziewięćdziesiąt dwa biliony ' +
    'pięćset osiemdziesiąt siedem miliardów');
  t('164386520349925870000000000', 'sto sześćdziesiąt cztery kwadryliony ' +
    'trzysta osiemdziesiąt sześć tryliardów pięćset dwadzieścia trylionów ' +
    'trzysta czterdzieści dziewięć biliardów dziewięćset dwadzieścia pięć ' +
    'bilionów osiemset siedemdziesiąt miliardów');
});
