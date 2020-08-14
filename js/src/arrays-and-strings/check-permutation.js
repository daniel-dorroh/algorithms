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
  if (typeof input1 !== 'string') {
    throw `input1 is '${typeof input1}' but it should be a string`;
  }
  if (typeof input2 !== 'string') {
    throw `input2 is '${typeof input2}' but it should be a string`;
  }
  const input1Info = countCharacters(input1);
  const input2Info = countCharacters(input2);
  for (let char in input1Info) {
    if (input1Info[char] !== input2Info[char]) {
      return false;
    }
  }
  return true;
};
