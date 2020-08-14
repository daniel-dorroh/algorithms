import { isPermutation } from './check-permutation';

describe('isPermutation', () => {

  test.each([null, undefined, [], {}, () => true, 123])('throws if input1 is not a string', (input1) => {
    expect(() => isPermutation(input1, 'a string')).toThrow(`input1 is '${typeof input1}' but it should be a string`);
  });

  test.each([null, undefined, [], {}, () => true, 123])('throws if input2 is not a string', (input2) => {
    expect(() => isPermutation('a string', input2)).toThrow(`input2 is '${typeof input2}' but it should be a string`);
  });

  test.each([
        ['', ''],
        ['a', 'a'],
        ['ab', 'ba'],
        ['abc', 'cba'],
        ['aaa', 'aaa'],
      ])('true if input2 is a permutation of input1', (input1, input2) => {
    expect(isPermutation(input1, input2)).toBe(true);
  });

  test.each([
        ['a', 'aa'],
        ['ab', 'bc'],
        ['abcabcabc', 'abbcabbcabbc'],
      ])('false if input2 is not a permutation of input1', (input1, input2) => {
    expect(isPermutation(input1, input2)).toBe(false);
  });

});
