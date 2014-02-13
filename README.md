in words
========

Convert natural numbers (and 0) to words.

Usage
-----

    var inWordsDe = require('in-words').de;
    inWordsDe('427534'); // => 'vierhundertsiebenundzwanzigtausendfünfhundertvierunddreißig'
    var inWordsEn = require('in-words').en;
    inWordsEn('427534'); // => 'four hundred twenty-seven thousand five hundred thirty-four'
    var inWordsPl = require('in-words').pl;
    inWordsPl('427534'); // => 'czterysta dwadzieścia siedem tysięcy pięćset trzydzieści cztery'

Todo
----

 - Support bigger numbers in german locale (http://de.wikipedia.org/wiki/Zahlennamen)
 - Write spanish version
 - Document de params
 - Document limits of de, en and pl
 - Make a correct param type with setParam method
 - Let two particles be able to join
 - words-to-number
   - https://npmjs.org/package/wtn
   - https://npmjs.org/package/numbered
   - https://npmjs.org/package/wordy

Other packages
-----------

The following packages do roughly the same:

 - https://npmjs.org/package/number-string-representation
 - https://npmjs.org/package/wtn
 - https://npmjs.org/package/numbered
 - https://npmjs.org/package/wordy
 - https://npmjs.org/package/slownie

Author
------

[Adrian Lang](http://adrianlang.de/id).

License
-------
Copyright 2013 Adrian Lang.

Licensed under the Apache License, Version 2.0. See (http://www.apache.org/licenses/LICENSE-2.0).
