import { getKthToLast } from './2.2-return-kth-to-last';
import { SingleList } from '@dinosanjo/data-structures';

describe('getKthToLast', () => {

  test('throws if list is not a SingleList', () => {
    expect(() => getKthToLast([1, 2, 3], 1)).toThrow('list is not a SingleList');
  });

  test('throws if k is larger than list', () => {
    expect(() => getKthToLast(new SingleList(), 2)).toThrow('k is larger than list');
  });

  test('throws if k is smaller than 1', () => {
    expect(() => getKthToLast(new SingleList(), 0)).toThrow('k is smaller than the minimum, 1');
  });

  test.each("25", {}, [], () => true)('throws k is not a number', (k) => {
    expect(() => getKthToLast(new SingleList(), k)).toThrow();
  });

  test('throws k is not an integer', () => {
    expect(() => getKthToLast(new SingleList(), 1.32)).toThrow('k is not an integer');
  });

  test.each([
        [1, 9],
        [2, 8],
        [3, 7],
        [4, 6],
        [5, 5],
        [6, 4],
        [7, 3],
        [8, 2],
        [9, 1],
      ])('returns kth to last value - k: %d val: %d', (k, kthToLast) => {
    const list = new SingleList();
    for (const value of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      list.pushBack(value);
    }
    expect(getKthToLast(list, k)).toBe(kthToLast);
  });

});
