import { throwIfNotType } from '../utility/arg-checking';

// Given two strings, write a method
// to decide if one is a permutation
// of the other

const countCharacters = (input) => {
  const charInfo = {};
  for (let char of input) {
    if (charInfo[char] === undefined) {
      charInfo[char] = 1;
    } else {
      charInfo[char]++;
    }
  }
  return charInfo;
};

export const isPermutation = (input1, input2) => {
  throwIfNotType(input1, 'string', 'input1');
  throwIfNotType(input2, 'string', 'input2');
  const input1Info = countCharacters(input1);
  const input2Info = countCharacters(input2);
  for (let char in input1Info) {
    if (input1Info[char] !== input2Info[char]) {
      return false;
    }
  }
  return true;
};
