import { throwIfNotType } from '../utility/arg-checking';

// Implement a method to perform basic string
// compression using the counts of repeated
// characters. For example, the string aabcccccaaa
// would become a2b1c5a3. If the 'compressed'
// string would not become smaller than the
// original string, your method should return
// the original string. You can assume the
// string has only upercase and lowercase letters a-z.

const getCharRepetitionInfo = (input, i) => {
  const char = input[i];
  let count = 1;
  i++;
  while (i < input.length) {
    if (input[i] !== char) {
      break;
    }
    count++;
    i++;
  }
  return {
    char: char,
    count: count,
    newI: i - 1,
  };
};

export const basicCompress = (input) => {
  throwIfNotType(input, 'string');
  if (input.length <= 2) {
    return input;
  }
  const compressedParts = [];
  for (let i = 0; i < input.length; i++) {
    const {char, count, newI} = getCharRepetitionInfo(input, i);
    compressedParts.push(`${char}${count}`);
    i = newI;
  }
  if (input.length <= compressedParts.length * 2) {
    return input;
  }
  return compressedParts.join('');
};
