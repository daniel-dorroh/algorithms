import { hasPalindromePermutation } from './1.4-palindrome-permutation';

describe('hasPalindromePermutation', () => {

  test.each([123, [], {}, () => true])('throws if input is not a string', (input) => {
    expect(() => hasPalindromePermutation(input)).toThrow();
  });

  test.each([
        '1234567',
        'abcdefg',
        '1  2',
        '1abc1',
        '   21',
      ])('false for strings without a palindrome permutation', (input) => {
    expect(hasPalindromePermutation(input)).toBe(false);
  });

  test.each([
        'aaa',
        'rraacce',
        '1  1',
        '1212   ',
        'abab',
        'aabbccc   ',
        ' ',
        '   ',
        'aabb',
        'ab a b',
        ' a b a b ',
        'sasadfgsadfghjk;hjk;sadfghjk;dfghjk;',
        'sa sadfgsadfgh jk;hjkz;sadfg hjk;dfghjk;',
      ])('true for strings with a palindrome permutation', (input) => {
    expect(hasPalindromePermutation(input)).toBe(true);
  });

});
