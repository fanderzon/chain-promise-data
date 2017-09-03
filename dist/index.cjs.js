'use strict';

// Specify a filter func to apply when the `mapper` is an array
// ['a', 'c'] applied to {a: 1, b: 2, c: 3} results in {a: 1, c: 3}
var arrayFilter = function (keys, data) { return Object.keys(data).reduce(
  function (acc, curr) { return Object.assign(
      acc,
      keys.indexOf(curr) !== -1 ? ( obj = {}, obj[curr] = data[curr], obj ) : {}
    )
      var obj; },
  {}
); };

var promiseDataChain = function (fn, mapper) {
  if ( mapper === void 0 ) mapper = function (res) { return res; };

  return function (res) {
  if ( res === void 0 ) res = {};

  return Promise.resolve(fn(res)).then(function (out) { return Object.assign(
    res,
    Array.isArray(mapper) ? arrayFilter(mapper, out) : mapper(out)
  ); }
);

}  };

module.exports = promiseDataChain;
