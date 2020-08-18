import { throwIfNotType } from '../utility/arg-checking';

// There are three types of edits that can be performed
// on strings: insert a character, remove a character,
// or replace a character. Given two strings, write a
// function to check if they are one edit or zero edits away.

const searchForInsertions = (longer, shorter, lIndex, sIndex, insertionCount) => {
  const maxInsertionCount = insertionCount;
  insertionCount--;
  lIndex++;
  while (insertionCount >= 0) {
    if (longer[lIndex] === shorter[sIndex]) {
      return {
        differenceCount: maxInsertionCount - insertionCount,
        newLIndex: lIndex,
        newMaxInsertionCount: insertionCount,
      };
    }
    insertionCount--;
    lIndex++;
  }
  return null;
};

export const diffInputs = (longer, sameOrShorter) => {
  if (longer.length < sameOrShorter.length) {
    throw `longer input '${longer}' is shorter than sameOrShorter input '${sameOrShorter}'`;
  }
  let differenceCount = 0;
  let maxInsertionCount = longer.length - sameOrShorter.length;
  for (let s = 0, l = 0; l < longer.length; s++, l++) {
    if (s === sameOrShorter.length) {
      differenceCount += longer.length - l;
      break;
    }
    // A difference of some kind exists here.
    if (longer[l] !== sameOrShorter[s]) {
      // A char was inserted if an insertion is possible
      // and if a subsequent char in the longer string matches
      // the current char in the shorter string. Once the
      // number of possible insertions is exhausted, the
      // only remaining possible edit is a mutation.
      let iterationDifferenceCount = 1;
      const results = searchForInsertions(longer, sameOrShorter, l, s, maxInsertionCount);
      if (results) {
        iterationDifferenceCount = results.differenceCount;
        l = results.newLIndex;
        maxInsertionCount = results.newMaxInsertionCount;
      }
      differenceCount += iterationDifferenceCount;
    }
  }
  return differenceCount;
};

export const areWithinOneEditDifference = (input1, input2) => {
  throwIfNotType(input1, 'string', 'input1');
  throwIfNotType(input2, 'string', 'input2');
  if (input1 === input2) {
    return true;
  }
  const [longer, sameOrShorter] = input1.length >= input2.length
      ? [input1, input2]
      : [input2, input1];
  if (longer.length - sameOrShorter.length > 1) {
    return false;
  }
  if (sameOrShorter.length === 0) {
    return true;
  }
  return diffInputs(longer, sameOrShorter) <= 1;
};
