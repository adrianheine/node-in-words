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
