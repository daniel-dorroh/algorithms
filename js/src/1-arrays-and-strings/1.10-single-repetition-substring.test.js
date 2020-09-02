import { findSingleRepetitionSubstrings } from './1.10-single-repetition-substring';

describe('findSingleRepetitionSubstrings', () => {

  test.each([123, {}, [], () => true])('throws if input is not a string', (input) => {
    expect(() => findSingleRepetitionSubstrings(input, 5)).toThrow();
  });

  test.each([123.4, "25", {}, [], () => true])('throw if k is not an integer', (k) => {
    expect(() => findSingleRepetitionSubstrings('abcd', k)).toThrow('k is not an integer');
  });

  test.each([
        'abcdefg',
        'aaaaaaa',
      ])('returns an empty array for %s', (input) => {
    expect(findSingleRepetitionSubstrings(input, 4)).toStrictEqual([]);
  });

  test.each([
        ['wasgwalawallawantopoosg', 3, ['ala', 'all', 'awa', 'awa', 'lla', 'oos', 'opo', 'poo']],
        ['wasgwalawallawantopoosg', 4, ['alaw', 'awal', 'awan', 'lawa', 'lawa', 'llaw', 'oosg', 'poos', 'topo', 'wala', 'wall']],
        ['wasgwalawallawantopoosg', 5, ['asgwa', 'awant', 'gwala', 'lawan', 'ntopo', 'poosg', 'wasgw']],
        ['wasgwalawallawantopoosg', 6, ['antopo', 'asgwal', 'awanto', 'lawant', 'sgwala']],
      ])('returns alphabetically ordered substrings', (input, k, substrings) => {
    expect(findSingleRepetitionSubstrings(input, k)).toStrictEqual(substrings);
  });

});
