import { throwIfNotType, throwIfNotInteger } from '../utility/arg-checking';

// Given a string and a number K, find
// all substrings of size K that
// contain exactly one character repetition.
// K - 1 characters in each substring must
// be unique characters. Substrings should
// be returned in alphabetical order.

const getUniqueChars = (input, start, end) => {
  const uniqueChars = new Set();
  for (let i = start; i < end; i++) {
    uniqueChars.add(input[i]);
  }
  return uniqueChars;
};

export const findSingleRepetitionSubstrings = (input, k) => {
  throwIfNotType(input, 'string');
  throwIfNotInteger(k, 'k');
  const substrings = [];
  for (let i = 0; i + k <= input.length; i++) {
    const uniqueChars = getUniqueChars(input, i, i + k);
    if (uniqueChars.size === k - 1) {
      substrings.push(input.substring(i, i + k));
    }
  }
  return substrings.sort();
};
