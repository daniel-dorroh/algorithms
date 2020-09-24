
// Given a number, you can rearrange the digits of that number to make a bigger number.
// Among all such permutations that are greater, one of them is the smallest.
// The smallest greater permutation = The next permutation.
// Find it.

// nextPermutation(12) = 21
// nextPermutation(315) = 351
// nextPermutation(583) = 835
// nextPermutation(12389) = 12398
// nextPermutation(372641) = 374126

function findPivot(digits) {
  for (let i = digits.length - 2; i >= 0; i--) {
    if (digits[i] < digits[i + 1]) {
      return i;
    }
  }
  return -1;
}

function findReplacement(digits, pivotI) {
  let currentDigit = digits[pivotI] + 1;
  while  (currentDigit <= 9) {
    const replacementIndex = digits.indexOf(currentDigit, pivotI + 1);
    if (replacementIndex >= 0) {
      return replacementIndex;
    }
    currentDigit++;
  }
  return -1;
}

function swap(values, i, j) {
  [values[i], values[j]] = [values[j], values[i]];
}

function getPivot(values, start, end) {
  const pivot = values[Math.floor((start + end) / 2)];
  let i = start - 1;
  let j = end + 1;
  while (true) {
    i++;
    while (values[i] < pivot) {
      i++;
    }
    j--;
    while (values[j] > pivot) {
      j--;
    }
    if (i >= j) {
      return j;
    }
    swap(values, i, j);
  }
}

function sort(values, start, end) {
  if (start >= end) {
    return;
  }
  const pivotI = getPivot(values, start, end);
  sort(values, start, pivotI);
  sort(values, pivotI + 1, end);
}

function sortEnd(digits, start) {
  sort(digits, start, digits.length - 1);
}

export const nextPermutation = (value) => {
  const digits = [...value].map(vs => Number.parseInt(vs));
  const pivotI = findPivot(digits);
  if (pivotI < 0) {
    throw `No permutation greater than ${value}`;
  }
  const swapI = findReplacement(digits, pivotI);
  if (swapI < 0) {
    throw `No next higher digit found`;
  }
  swap(digits, pivotI, swapI);
  sortEnd(digits, pivotI + 1);
  return digits.join('');
};
