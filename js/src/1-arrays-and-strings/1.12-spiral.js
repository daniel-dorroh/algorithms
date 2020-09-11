
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

const increment = (i) => i + 1;
const decrement = (i) => i - 1;
const withinBounds = (i, lowerBound, upperBound) => i >= lowerBound && i <= upperBound;
const bothWithinBounds = (i, j, left, right, top, bottom) => {
  return withinBounds(i, top, bottom) && withinBounds(j, left, right);
};

/**
 * Manual testing
 *
 * n = 1
 *  count = 1, spiral = [[]], left = 0, top = 0, right = 0, bottom = 0, i = 0, j = 0, isIInc = true, isJInc = true, nextI = nextJ = increment
 *  loop 0: spiral = [[1]], count = 2, nextI = nextJ = increment, top = 1, right = -1, j = -1, isJIncrementing = isIIncrementing = false
 *
 * n = 2
 *          spiral = [[], []],                 count = 1, nextIndex = increment, left = 0, j = 0, right = 1, top = 0, i = 0, bottom = 1, incrementing = true
 *  loop 0: spiral = [[1], []],                count = 2, nextIndex = increment, left = 0, j = 1, right = 1, top = 0, i = 0, bottom = 1
 *  loop 1: spiral = [[1, 2], []],             count = 3, nextIndex = increment, left = 0, j = 1, right = 1, top = 0, i = 1, bottom = 1
 *  loop 2: spiral = [[1, 2], [undefined, 3]], count = 4, nextIndex = increment, left = 0, j = 0, right = 0, top = 1, i = 1, bottom = 1, incrementing = false,
 *  loop 3: spiral = [[1, 2], [4, 3]],         count = 5, nextIndex = decrement, left = 0, j = 0, right = 0, top = 1, i = 0, bottom = 1
 *
 * n = 3
 *          spiral = [[], [], []]                                                       count = 1, nextIndex = increment, left = 0, j = 0, right = 2, top = 0, i = 0, bottom = 2, incrementing = true
 *  loop 0: spiral = [[1], [], []]                                                      count = 2,                                  j = 1,
 *  loop 1: spiral = [[1, 2], [], []]                                                   count = 3,                                  j = 2,
 *  loop 2: spiral = [[1, 2, 3], [], []]                                                count = 4,                                                             i = 1,
 *  loop 3: spiral = [[1, 2, 3], [undefined, undefined, 4], []]                         count = 5,                                                             i = 2,
 *  loop 4: spiral = [[1, 2, 3], [undefined, undefined, 4], [undefined, undefined, 5],] count = 6,                                  j = 1, right = 1, top = 1,                    incrementing = false
 *  loop 5: spiral = [[1, 2, 3], [undefined, undefined, 4], [undefined, 6, 5]]          count = 7, nextIndex = decrement,           j = 0,
 *  loop 6: spiral = [[1, 2, 3], [undefined, undefined, 4], [7, 6, 5]]                  count = 8,                                                             i = 1,
 *  loop 7: spiral = [[1, 2, 3], [8, undefined, 4], [7, 6, 5]]                          count = 9,                        left = 1, j = 1,                            bottom = 1, incrementing = true
 *  loop 8: spiral = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]                                  count = 10,nextIndex = increment,           j = 0, right = 0, top = 2,                    incrementing = false
 * return [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
 */
export const efficientSpiral = (n) => {
  const spiral = initializeSpiral(n);
  let left = 0, top = 0;
  let right = n - 1, bottom = n -1;
  let i = 0, j = 0;
  let count = 1;
  let incrementing = true;
  let nextIndex = increment;
  while (left <= right && top <= bottom && bothWithinBounds(i, j, left, right, top, bottom)) {
    spiral[i][j] = count++;
    nextIndex = incrementing ? increment : decrement;
    if (withinBounds(nextIndex(j), left, right)) {
      j = nextIndex(j);
    } else if (withinBounds(nextIndex(i), top, bottom)) {
      i = nextIndex(i);
    } else {
      if (incrementing) {
        top++;
        right--;
        j--;
      } else {
        bottom--;
        left++;
        j++;
      }
      incrementing = !incrementing;
    }
  }
  return spiral;
};
