export var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getAverage = (arr) => {
  let reducer = (total, currentValue) => total + currentValue;
  let sum = arr.reduce(reducer, 0);
  return sum / arr.length;
};
