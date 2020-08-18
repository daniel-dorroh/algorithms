import { throwIfNotType } from '../utility/arg-checking';

// Assume you have a method isSubstring which
// checks if one word is a substring of another.
// Given two strings, s1 and s2 write code to
// check if s2 is a rotation of s1 using only
// one call to isSubstring.
//
// Example
//  'waterbottle' is a rotation of 'erbottlewat'

const isSubstring = (s1, s2) => {
  return s2.indexOf(s1) > -1;
};

// Reason this works:
// s1:    |123456|
// s2+s2: |----12|23456--|
// if s1 is a substring of s2+s2,
// and s1 and s2 are the same length,
// s2 must be a rotation of s1.
export const isRotation = (s1, s2) => {
  throwIfNotType(s1, 'string', 's1');
  throwIfNotType(s2, 'string', 's2');
  if (s1.length !== s2.length) {
    return false;
  }
  return isSubstring(s1, s2 + s2);
};
