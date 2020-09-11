
// Given an int n, return an nxn matrix madep
// of an ascending spiral pattern starting at
// (0, 0), going in the clockwise direction.
//
// Ex:
//  n = 4
//  result
//    1  2  3  4
//   12 13 14  5
//   11 16 15  6
//   10  9  8  7

const initializeSpiral = (n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = [];
  }
  return result;
};

const getRange = (start, finish) => {
  const nextI = start <= finish
      ? (i) => i + 1
      : (i) => i - 1;
  const range = [];
  while (start !== finish) {
    range.push(start);
    start = nextI(start);
  }
  return range;
};

const reverse = (values) => {
  if (values.length > 1) {
    values.reverse();
  }
  return values;
};

const buildSpiral = (iIndices, jIndices, result, count = 1) => {
  if (iIndices.length === 0 && jIndices.length === 0) {
    return;
  }
  const fixedI = iIndices.pop();
  for (const j of jIndices) {
    result[fixedI][j] = count++;
  }
  const fixedJ = jIndices.pop();
  reverse(iIndices);
  reverse(jIndices);
  for (const i of iIndices) {
    result[i][fixedJ] = count++;
  }
  buildSpiral(iIndices, jIndices, result, count);
};

export const spiral = (n) => {
  const resultSpiral = initializeSpiral(n);
  let iIndices = getRange(n-1, -1);
  let jIndices = getRange(0, n);
  buildSpiral(iIndices, jIndices, resultSpiral);
  return resultSpiral;
};
