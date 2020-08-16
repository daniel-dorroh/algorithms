import { basicCompress } from './1.6-string-compression';

describe('basicCompress', () => {

  test.each([123, [], {}, () => true])('throws if input "%s" is not a string', (input) => {
    expect(() => basicCompress(input)).toThrow();
  });

  test.each([
        '',
        'a',
        'aa',
        'ab',
        'abc',
        'acab',
        'glbtq',
        'aab',
        'aaabbc',
        'abbbaac',
        'aAa',
      ])('returns input if compressed string is not shorter', (input) => {
    expect(basicCompress(input)).toStrictEqual(input);
  });

  test.each([
        ['aaabb', 'a3b2'],
        ['aaaAAbccCCC', 'a3A2b1c2C3'],
        ['aaa', 'a3'],
        ['uubgggggg', 'u2b1g6'],
      ])('returns compressed result', (input, compressionResult) => {
    expect(basicCompress(input)).toStrictEqual(compressionResult);
  });

});
