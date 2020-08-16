import { areWithinOneEditDifference, diffInputs } from './1.5-one-away';

describe('diffInputs', () => {

  test('throws if longer is shorter than shorter', () => {
    const longer = 'moo';
    const shorter = 'moon';
    expect(() => diffInputs(longer, shorter))
        .toThrow(`longer input '${longer}' is shorter than sameOrShorter input '${shorter}'`);
  });

  test('0 when input1 and input2 are the same', () => {
    expect(diffInputs('crispy', 'crispy')).toBe(0);
  });

  test.each([
        [1, 'moon', 'moan'],
        [1, 'Moon', 'moon'],
        [1, 'bead', 'brad'],
        [1, 'moan', 'man'],
        [1, 'moon', 'moo'],
        [1, 'loop', 'oop'],
        [2, 'youall', 'yall'],
        [3, 'a0b0c0d', 'abcd'],
        [4, 'corrupt', 'cop'],
        [4, 'abczzzz', 'abcdef'],
        [5, 'bliar', 'arson'],
      ])('%d for "%s" and "%s"', (result, input1, input2) => {
    expect(diffInputs(input1, input2)).toBe(result);
  });

});

describe('areWithinOneEditDifference', () => {

  test('true if both inputs are the same', () => {
    expect(areWithinOneEditDifference('twenty-five', 'twenty-five')).toBe(true);
  });

  test.each([
        ['', 'ab'],
        [' ', '   '],
        ['dog run', ' dog  run '],
      ])('false for inputs having char difference of 2 or more - (%s, %s)', (input1, input2) => {
    expect(areWithinOneEditDifference(input1, input2)).toBe(false);
  });

  test.each([
        ['', 'a'],
        ['a', 'b'],
        ['burn', 'burnt'],
        ['turnt', 'turn'],
        ['man', 'moan'],
        ['atop', 'top'],
        ['ginger', 'Ginger'],
        ['woman', 'women'],
        ['dear', 'deer'],
      ])('true if inputs are within one a one edit difference - (%s, %s)', (input1, input2) => {
    expect(areWithinOneEditDifference(input1, input2)).toBe(true);
  });

  test.each([
        ['word', 'WoRd'],
        ['at0p', 'top'],
        ['racer', 'racE'],
        ['Among', 'amon'],
        ['briar', 'arson'],
        ['abcdef', 'bacdef'],
        ['bear', 'brad'],
        ['eater', 'ear'],
        ['beaver', 'bear'],
        ['Moan', 'moa'],
      ])('false if inputs are not within one a one edit difference - (%s, %s)', (input1, input2) => {
    expect(areWithinOneEditDifference(input1, input2)).toBe(false);
  });

});
