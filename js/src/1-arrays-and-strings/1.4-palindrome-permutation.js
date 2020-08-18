import { throwIfNotType } from '../utility/arg-checking';

// Given a string, write a function to check
// if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the
// same forwards and backwards. A permutation is
// a rearrangement of letters. The palindrome does
// not need to be limited to just dictionary words.
//
// Example
//  Input: 'Tact Coa'
//  Output: true
// Remarks
//  The reason 'Tact Coa' is valid is that it can make the following
//  palindromes: 'taco cat', 'atco cta', and so on.
//  It is apparent that white space does not factor into the
//  palindrome-ness of the input. Otherwise, we would need
//  an extra white space to make 'Tact Coa' a valid input.

const isOdd = (input) => (input % 2) !== 0;

export const hasPalindromePermutation = (input) => {
  throwIfNotType(input, 'string');
  const charCountInfo = {};
  let oddCharGroupCount = 0;
  for (let char of input) {
    // White space is not counted based on example.
    // See previous remarks
    if (char === ' ') {
      continue;
    }
    if (charCountInfo[char] === undefined) {
      charCountInfo[char] = 1;
      oddCharGroupCount++;
    } else {
      charCountInfo[char]++;
      if (isOdd(charCountInfo[char])) {
        oddCharGroupCount++;
      } else {
        oddCharGroupCount--;
      }
    }
  }
  return oddCharGroupCount <= 1;
};
