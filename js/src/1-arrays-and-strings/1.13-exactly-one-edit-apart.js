import { throwIfNotType } from '../utility/arg-checking';

// Write a function that returns whether two words are exactly "one edit" away

/**
 * Manual debugging
 *
 * s1 = 'art', s2 = 'dart'
 * editCount = 0, smaller = 'art', larger = 'dart'
 *  'a' !== 'd' ? yep -> editCount = 1, largerI = 1
 *  'a' !== 'a' ? nop  -> smallerI = 1, largerI = 2
 *  'r' !== 'r' ? nop  -> smallerI = 2, largerI = 3
 *  't' !== 't' ? nop  -> smallerI = 3, largerI = 4
 * <- true
 *
 * s1 = '', s2 = ''
 * <- false
 *
 * s1 = 'abc', s2 = 'abc'
 * <- false
 *
 * s1 = 'cart', s2 = 'dart'
 * editCount = 0, smaller = 'cart', larger = 'dart'
 *  'c' !== 'd' ? yep -> editCount = 1
 *  'a' !== 'a' ? nop ...
 * <- true
 *
 * s1 = 'cArt', s2 = 'dart'
 * editCount = 0, smaller = 'cArt', larger = 'dart'
 *  'c' !== 'd' ? yep -> editCount = 1
 *  'A' !== 'a' ? yep ->
 * <- false
*/

export const oneEditApart = (s1, s2) => {
  throwIfNotType(s1, 'string', 's1');
  throwIfNotType(s2, 'string', 's2');
  if (Math.abs(s1.length - s2.length) > 1) {
    return false;
  }
  const equalLength = s1.length === s2.length;
  if (equalLength && s1.indexOf(s2) === 0) {
    return false;
  }
  const [smaller, larger] = s1.length <= s2.length ? [s1, s2] : [s2, s1];
  let editCount = 0, largerI = 0
  for (let smallerI = 0; smallerI < smaller.length; smallerI++, largerI++) {
    if (smaller[smallerI] !== larger[largerI]) {
      if (editCount !== 0) {
        return false;
      } else {
        editCount++;
        if (!equalLength) {
          smallerI--;
        }
      }
    }
  }
  editCount += larger.length - largerI;
  return editCount === 1;
};
