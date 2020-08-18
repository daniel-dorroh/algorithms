import { bombermanTheMap } from './1.8-zero-matrix';

describe('bombermanZeros', () => {

  test.each([123, 'twenty-five', {}, () => true])('throws if input is not an array', (input) => {
    expect(() => bombermanTheMap(input)).toThrow('input is not an array');
  });

  test('returns input if empty array', () => {
    expect(bombermanTheMap([])).toStrictEqual([]);
  });

  test('returns input if 0x0 matrix', () => {
    expect(bombermanTheMap([[]])).toStrictEqual([[]]);
  });

  test('returns input if 1x1 matrix', () => {
    const input = [[25]];
    expect(bombermanTheMap(input)).toStrictEqual(input);
  });

  test('bombermans all entries of a 1xN matrix', () => {
    const input = [[1, 2, 3, 4, 0, 6, 7, 8]];
    const bombermannedInput = [[0, 0, 0, 0, 0, 0, 0, 0]];
    expect(bombermanTheMap(input)).toStrictEqual(bombermannedInput);
  });

  test('bombermans all entries of a Nx1 matrix', () => {
    const input = [[1], [2], [3], [4], [0], [6], [7], [8]];
    const bombermannedInput = [[0], [0], [0], [0], [0], [0], [0], [0]];
    expect(bombermanTheMap(input)).toStrictEqual(bombermannedInput);
  });

  test('bombermans expected rows and columns', () => {
    const input = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 0, 3, 4, 5, 6, 7, 0, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 0, 9],
    ];
    const bombermannedInput = [
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 3, 4, 0, 6, 7, 0, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(bombermanTheMap(input)).toStrictEqual(bombermannedInput);
  });

  test('makes all zero matrix', () => {
    const input = [
      [0, 2, 3, 4, 5],
      [1, 0, 3, 4, 5],
      [1, 2, 0, 4, 5],
      [1, 2, 3, 0, 5],
      [1, 2, 3, 4, 0],
    ];
    const bombermannedInput = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    expect(bombermanTheMap(input)).toStrictEqual(bombermannedInput);
  });

});
