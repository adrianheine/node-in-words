exports.withOverrides = function (overrides, algo, val) {
  if (overrides.hasOwnProperty(val)) {
    return overrides[val];
  }
  return algo(val);
};

exports.firstPropFrom = function (object, i) {
  for (;; ++i) {
    if (object.hasOwnProperty(i)) {
      return object[i];
    }
  }
};

exports.splitHandle = function (opts, val) {
  var pos = val.length - opts.cutOffLowest;
  var handleHigherPart = opts.handleHigherPart || opts.handleParts;
  var handleLowerPart = opts.handleLowerPart || opts.handleParts;
  return opts.join(handleHigherPart(val.substr(0, pos)), handleLowerPart(val.substr(pos)));
};
