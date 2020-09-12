import { isNumberColorful } from './6.12-colorful-numbers';

describe('isNumberColorful', () => {

  const colorful = 'Colorful';
  const uncolorful = `Not ${colorful}`;

  test.each([
        12345,
        123,
        236,
        248,
      ])('returns Not Colorful for non-colorful number %s', (input) => {
    expect(isNumberColorful(input)).toBe(uncolorful);
  });

  test('returns Colorful for single-digit number', () => {
    expect(isNumberColorful(1)).toBe(colorful);
  });

  test.each([
        23,
        3245,
        987,
      ])('returns Colorful for colorful number %s', (input) => {
    expect(isNumberColorful(input)).toBe(colorful);
  });

});
