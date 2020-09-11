import { spiral, efficientSpiral } from './1.12-spiral';

describe('spiral', () => {

  test('works for n = 1 case', () => {
    const result = [[1]];
    expect(spiral(1)).toStrictEqual(result);
  });

  test('works for n = 2', () => {
    const result = [[1, 2], [4, 3]];
    expect(spiral(2)).toStrictEqual(result);
  });

  test('works for n = 4', () => {
    const result = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]];
    expect(spiral(4)).toStrictEqual(result);
  });

  test('works for n = 5', () => {
    const result = [[1, 2, 3, 4, 5], [16, 17, 18, 19, 6], [15, 24, 25, 20, 7], [14, 23, 22, 21, 8], [13, 12, 11, 10, 9]];
    expect(spiral(5)).toStrictEqual(result);
  });

});

describe('efficientSpiral', () => {

  test('works for n = 1 case', () => {
    const result = [[1]];
    expect(efficientSpiral(1)).toStrictEqual(result);
  });

  test('works for n = 2', () => {
    const result = [[1, 2], [4, 3]];
    expect(efficientSpiral(2)).toStrictEqual(result);
  });

  test('works for n = 4', () => {
    const result = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]];
    expect(efficientSpiral(4)).toStrictEqual(result);
  });

  test('works for n = 5', () => {
    const result = [[1, 2, 3, 4, 5], [16, 17, 18, 19, 6], [15, 24, 25, 20, 7], [14, 23, 22, 21, 8], [13, 12, 11, 10, 9]];
    expect(efficientSpiral(5)).toStrictEqual(result);
  });

});
