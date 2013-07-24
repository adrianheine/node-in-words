var assert = require('assert');

exports.inWordsTest = function (inWords, number, string) {
  it('gives the correct result for ' + number, function () {
    assert.equal(inWords(number), string);
  });
};
