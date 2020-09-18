import { countTwos } from './17.6-count-of-2s';

describe('countTwos', () => {

  test('returns 0 for n = 0 and 1', () => {
    expect(countTwos(0)).toBe(0);
    expect(countTwos(1)).toBe(0);
  });

  test.each([
        [2, 1],
        [12, 2],
        [30, 13],
        [100, 20],
        [200, 41],
        [300, 160],
      ])('return correct number for n = %s', (n, twoCount) => {
    expect(countTwos(n)).toBe(twoCount);
  });

});
