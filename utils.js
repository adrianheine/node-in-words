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
  return opts.join(opts.handleParts(val.substr(0, pos)), opts.handleParts(val.substr(pos)));
};
