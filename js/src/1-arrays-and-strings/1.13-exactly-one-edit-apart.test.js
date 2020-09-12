import { oneEditApart } from './1.13-exactly-one-edit-apart';

describe('oneEditApart', () => {

  const nonStringInputs = [null, undefined, [], {}, () => true, 123];

  test.each(nonStringInputs)('throws if s1 is not a string', (input1) => {
    expect(() => oneEditApart(input1, 'a string')).toThrow();
  });

  test.each(nonStringInputs)('throws if s2 is not a string', (input2) => {
    expect(() => oneEditApart('a string', input2)).toThrow();
  });

  test('false if both inputs are the same', () => {
    expect(oneEditApart('twenty-five', 'twenty-five')).toBe(false);
  });

  test.each([
        ['', 'ab'],
        [' ', '   '],
        ['dog run', ' dog  run '],
      ])('false for inputs having char difference of 2 or more - (%s, %s)', (input1, input2) => {
    expect(oneEditApart(input1, input2)).toBe(false);
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
      ])('true if inputs are one edit apart - (%s, %s)', (input1, input2) => {
    expect(oneEditApart(input1, input2)).toBe(true);
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
      ])('false if inputs are not one edit apart - (%s, %s)', (input1, input2) => {
    expect(oneEditApart(input1, input2)).toBe(false);
  });

});
