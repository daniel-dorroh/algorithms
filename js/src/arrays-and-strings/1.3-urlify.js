import { throwIfNotType } from '../utility/arg-checking';

// Write a method to replace all spaces in a
// string with '%20'. You may assume that the
// string has sufficient space at the end to
// hold the additional characters, and that you
// are given the "true" length of the string.

const indexOfLastNonWhiteSpaceCharacter = (input, length) => {
  let i = length - 1;
  while (true && i > 0) {
    if (input[i] !== ' ') {
      break;
    }
    i--;
  }
  return i;
};

// The question sets the stage for an in-place,
// space-optimized solution, but since strings are
// immutable in JavaScript, I'm using arrays for
// a 'c-like' solution.
export const cStyleUrlify = (charArray, length) => {
  let writePosition = length - 1;
  let readPosition =
      indexOfLastNonWhiteSpaceCharacter(charArray, length);
  if (readPosition === 0) {
    writePosition = 0;
    while (writePosition < length) {
      charArray[writePosition++] = '%';
      charArray[writePosition++] = '2';
      charArray[writePosition++] = '0';
    }
  } else {
    while (readPosition >= 0) {
      if (charArray[readPosition] !== ' ') {
        charArray[writePosition] = charArray[readPosition];
        writePosition--;
      } else {
        charArray[writePosition--] = '0';
        charArray[writePosition--] = '2';
        charArray[writePosition--] = '%';
      }
      readPosition--;
    }
  }
  return charArray;
};

// A non-c-like implementation
export const urlify = (input) => {
  throwIfNotType(input, 'string');
  const urlifiedStringParts = [];
  let writePosition = input.length - 1;
  let readPosition =
      indexOfLastNonWhiteSpaceCharacter(input, input.length);
  if (readPosition === 0) {
    writePosition = 0;
    while (writePosition < input.length) {
      urlifiedStringParts.push('%20');
      writePosition += 3;
    }
  } else {
    while (readPosition >= 0) {
      if (input[readPosition] !== ' ') {
        urlifiedStringParts[writePosition] = input[readPosition];
        writePosition--;
      } else {
        urlifiedStringParts[writePosition--] = '0';
        urlifiedStringParts[writePosition--] = '2';
        urlifiedStringParts[writePosition--] = '%';
      }
      readPosition--;
    }
  }
  return urlifiedStringParts.join('');
};
