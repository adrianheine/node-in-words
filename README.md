in words
========

Convert natural numbers (and 0) to words.

Usage

```js
const inWordsDe = require('in-words').de;
inWordsDe('427534'); // => 'vierhundertsiebenundzwanzigtausendfünfhundertvierunddreißig'

const inWordsEn = require('in-words').en;
inWordsEn('427534'); // => 'four hundred twenty-seven thousand five hundred thirty-four'

const inWordsPl = require('in-words').pl;
inWordsPl('427534'); // => 'czterysta dwadzieścia siedem tysięcy pięćset trzydzieści cztery'
```

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

Changes
---------

v0.0.1 (2013-06-21)

 - Initial version with basic German locale

v0.0.2 (2013-08-14)

 - Added basic English locale
 - Moved most of the string manipulation into an abstract ./particles.js

v0.1.0 (2014-02-16)

 - Added Polish locale
 - Made German locale work with much bigger numbers
 - Fixed German locale for numbers ending with 1

v0.1.1 (2015-11-13)

 - Reflected my name change in documentation and links
 - Updated devDependencies
 - Added jshint

v0.2.0 (2015-11-13)

 - Added example.js for npmjs.org tonic integration
 - Fixed 10 plus female noun in German locale
 - Fixed ?00 plus noun in German locale
 - Introduced Particle::asJoiner and Particle::asPrefix
 - Introduced Words
 - Removed Particles::getMembers

v0.2.1 (2016-02-14)

 - Fixed English spelling for 18

v0.2.2 (2017-04-21)

 - Fixed Polish spelling for all numbers with 9 (Thanks to Marek Mizier)

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

[Adrian Heine](http://adrianheine.de/id).

License
-------
Copyright 2013–2015 Adrian Heine.

Licensed under the Apache License, Version 2.0. See (http://www.apache.org/licenses/LICENSE-2.0).
