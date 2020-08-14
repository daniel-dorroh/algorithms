import { areAllCharactersUnique } from './is-unique';

describe('areAllCharactersUnique', () => {

  test.each([null, undefined, ''])('false for "%s" input', (input) => {
    expect(areAllCharactersUnique(input)).toBe(false);
  });

  test.each([123, {}, [], () => true])('false for non-string input "%s"', (input) => {
    expect(areAllCharactersUnique(input)).toBe(false);
  });

  test('true for unique input', () => {
    expect(areAllCharactersUnique('abcdefghi')).toBe(true);
  });

  test('false for non-unique input', () => {
    expect(areAllCharactersUnique('abcabc')).toBe(false);
  });

});

