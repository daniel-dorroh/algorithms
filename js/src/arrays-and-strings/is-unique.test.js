import { areAllCharactersUnique } from './is-unique';

describe('areAllCharactersUnique', () => {

  test.each([null, undefined, 123, {}, [], () => true])('throws for non-string input "%s"', (input) => {
    expect(() => areAllCharactersUnique(input)).toThrow(`input is ${typeof input} but should be a string`);
  });

  test('false for empty string input', () => {
    expect(areAllCharactersUnique('')).toBe(false);
  });

  test('true for unique input', () => {
    expect(areAllCharactersUnique('abcdefghi')).toBe(true);
  });

  test('false for non-unique input', () => {
    expect(areAllCharactersUnique('abcabc')).toBe(false);
  });

});

