import { nextPermutation } from './17.37-next-permutation';

describe('nextPermutation', () => {

  test.each(
    [
      ['12', '21'],
      ['315', '351'],
      ['583', '835'],
      ['12389', '12398'],
      ['372641', '374126'],
    ]
  )('finds next lowest permutation', (input, output) => {
    expect(nextPermutation(input)).toBe(output);
  });

});
