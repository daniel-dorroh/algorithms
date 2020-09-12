import { mergeSort } from './1.15-merge-sort';

describe('mergeSort', () => {

  test('sorts even length array', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12, 13];
    expect(mergeSort(input)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12, 13]);
  });

  test('sorts odd length array', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12];
    expect(mergeSort(input)).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12]);
  });

  test('sorts empty array', () => {
    expect(mergeSort([])).toStrictEqual([]);
  });

});
