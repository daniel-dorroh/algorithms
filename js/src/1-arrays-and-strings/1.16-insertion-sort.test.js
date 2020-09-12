import { insertionSort } from './1.16-insertion-sort';

describe('insertionSort', () => {

  test('sorts array', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12, 13];
    insertionSort(input);
    expect(input).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12, 13]);
  });

  test('sorts array with repeats', () => {
    const input = [2, 2, 1, 1, 2, 1];
    insertionSort(input);
    expect(input).toStrictEqual([1, 1, 1, 2, 2, 2]);
  });

  test('sorts empty array', () => {
    const input = [];
    insertionSort(input);
    expect(input).toStrictEqual([]);
  });

});
