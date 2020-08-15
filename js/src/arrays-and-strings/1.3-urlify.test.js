import { cStyleUrlify, urlify } from './1.3-urlify';

describe('cStyleUrlify', () => {

  test('returns char array string for empty char array', () => {
    expect(cStyleUrlify([], 0)).toStrictEqual([]);
  });

  test.each([
        [['M','r',' ','J','o','h','n',' ','S','m','i','t','h',' ',' ',' ',' '],
         ['M','r','%','2','0','J','o','h','n','%','2','0','S','m','i','t','h']],
        [['S',' ','p',' ','a',' ','c',' ','e',' ',' ',' ',' ',' ',' ',' ',' '],
         ['S','%','2','0','p','%','2','0','a','%','2','0','c','%','2','0','e']],
        [[' ',' ',' ',' ',' ',' '], ['%','2','0','%','2','0']],
      ])('returns urlified char array for input', (input, urlifiedInput) => {
    expect(cStyleUrlify(input, input.length)).toStrictEqual(urlifiedInput);
  });

});

describe('urlify', () => {

  test('returns empty string for empty string', () => {
    expect(urlify('')).toBe('');
  });

  test.each([
        ['Mr John Smith    ',
         'Mr%20John%20Smith'],
        ['S p a c e        ',
         'S%20p%20a%20c%20e'],
        ['      ', '%20%20'],
        ['Extra  spaces  inside        ',
         'Extra%20%20spaces%20%20inside']
      ])('returns urlified string for input', (input, urlifiedInput) => {
    expect(urlify(input)).toBe(urlifiedInput);
  });
});
