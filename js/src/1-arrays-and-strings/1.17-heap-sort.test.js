import { heapSort } from './1.17-heap-sort';

describe('heapSort', () => {

  test('sorts array', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12, 13];
    heapSort(input);
    expect(input).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12, 13]);
  });

  test('sorts array with repeats', () => {
    const input = [2, 2, 1, 1, 2, 1];
    heapSort(input);
    expect(input).toStrictEqual([1, 1, 1, 2, 2, 2]);
  });

  test('sorts empty array', () => {
    const input = [];
    heapSort(input);
    expect(input).toStrictEqual([]);
  });

});
