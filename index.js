// Specify a filter func to apply when the `mapper` is an array
// ['a', 'c'] applied to {a: 1, b: 2, c: 3} results in {a: 1, c: 3}
const arrayFilter = (keys, data) =>
Object.keys(data).reduce(
  (acc, curr) =>
    Object.assign(
      acc,
      keys.indexOf(curr) !== -1 ? { [curr]: data[curr] } : {}
    ),
  {}
);

const promiseDataChain = (fn, mapper = res => res) => (res = {}) =>
Promise.resolve(fn(res)).then(out =>
  Object.assign(
    res,
    Array.isArray(mapper) ? arrayFilter(mapper, out) : mapper(out)
  )
);

export default promiseDataChain;
