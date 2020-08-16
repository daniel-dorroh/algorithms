// There are three types of edits that can be performed
// on strings: insert a character, remove a character,
// or replace a character. Given two strings, write a
// function to check if they are one edit or zero edits away.

export const diffInputs = (longer, sameOrShorter) => {
  if (longer.length < sameOrShorter.length) {
    throw `longer input '${longer}' is shorter than sameOrShorter input '${sameOrShorter}'`;
  }
  let differenceCount = 0;
  let possibleInsertionCount = longer.length - sameOrShorter.length;
  for (let s = 0, l = 0; l < longer.length; s++, l++) {
    if (s === sameOrShorter.length) {
      differenceCount += longer.length - l;
      break;
    }
    // A difference of some kind exists here.
    if (longer[l] !== sameOrShorter[s]) {
      // A char was inserted if an insertion is possible
      // and if the next char in the longer string matches
      // the current char in the shorter string. Once the
      // number of possible insertions is exhausted, the
      // only remaining possible edit is a mutation.
      let iterationDifferenceCount = 1;
      let searchingInsertionCount = possibleInsertionCount - 1;
      let searchingL = l + 1;
      // Search to see if change is an insertion.
      while (searchingInsertionCount >= 0) {
        if (longer[searchingL] === sameOrShorter[s]) {
          // Since the change was an insertion, record
          // how many characters were inserted by updating
          // loop indices.
          l = searchingL;
          iterationDifferenceCount = possibleInsertionCount - searchingInsertionCount;
          possibleInsertionCount = searchingInsertionCount;
        }
        searchingInsertionCount--;
        searchingL++;
      }
      differenceCount += iterationDifferenceCount;
    }
  }
  return differenceCount;
};

export const areWithinOneEditDifference = (input1, input2) => {
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
