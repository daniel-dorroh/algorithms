import { throwIfNotType } from '../utility/arg-checking';

// Implement an algorithm to determine if a string
// has all unique characters. What if you cannot
// use additional data structures?

export const areAllCharactersUnique = (input) => {
  throwIfNotType(input, 'string');
  if (input.length === 0) {
    return false;
  }
  for (let i = 0; i < input.length; i++) {
    const char1 = input[i];
    // No need to check the final character
    for (let j = i + 1; j < input.length - 1; j++) {
      const char2 = input[j];
      if (char1 === char2) {
        return false;
      }
    }
  }
  return true;
};
