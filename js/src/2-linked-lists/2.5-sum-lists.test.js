import { SingleList } from '@dinosanjo/data-structures';
import { sum, reverseSum } from './2.5-sum-lists';

describe('sum', () => {

  const nonLists = [123, "15", {}, [], () => 25];

  test.each(nonLists)('throws if x is not a SingleList', (x) => {
    expect(() => sum(x, new SingleList())).toThrow('x is not a SingleList');
  });

  test.each(nonLists)('throws if y is not a SingleList', (y) => {
    expect(() => sum(new SingleList(), y)).toThrow('y is not a SingleList');
  });

  test('returns x if y is empty', () => {
    const x = new SingleList();
    x.pushBack(1);
    x.pushBack(2);
    x.pushBack(3);
    const total = sum(x, new SingleList());
    expect(total.getValues()).toStrictEqual([1, 2, 3]);
  });

  test.each([
        [[1], [9, 9, 9], [0, 0, 0, 1]],
        [[1], [8, 9, 9], [9, 9, 9]],
        [[5, 5], [0, 5, 4], [5, 0, 5]],
        [[9, 9, 9], [9, 9, 9], [8, 9, 9, 1]],
        [[1], [0, 1], [1, 1]],
        [[1, 2, 3], [3, 2, 1], [4, 4, 4]],
      ])('returns sum', (x, y, total) => {
    const xList = new SingleList();
    for (const digit of x) {
      xList.pushBack(digit);
    }
    const yList = new SingleList();
    for (const digit of y) {
      yList.pushBack(digit);
    }
    const result = sum(xList, yList);
    expect(result.getValues()).toStrictEqual(total);
  });

});

describe('reverseSum', () => {

  const nonLists = [123, "15", {}, [], () => 25];

  test.each(nonLists)('throws if x is not a SingleList', (x) => {
    expect(() => reverseSum(x, new SingleList())).toThrow('x is not a SingleList');
  });

  test.each(nonLists)('throws if y is not a SingleList', (y) => {
    expect(() => reverseSum(new SingleList(), y)).toThrow('y is not a SingleList');
  });

  test('returns x if y is empty', () => {
    const x = new SingleList();
    x.pushBack(1);
    x.pushBack(2);
    x.pushBack(3);
    const total = reverseSum(x, new SingleList());
    expect(total.getValues()).toStrictEqual([1, 2, 3]);
  });

  test.each([
        [      [1], [9, 9, 9], [1, 0, 0, 0]],
        [      [1], [9, 9, 8],    [9, 9, 9]],
        [   [5, 5], [4, 5, 0],    [5, 0, 5]],
        [[9, 9, 9], [9, 9, 9], [1, 9, 9, 8]],
        [      [1],    [1, 0],       [1, 1]],
        [[1, 2, 3], [3, 2, 1],    [4, 4, 4]],
      ])('returns sum', (x, y, total) => {
    const xList = new SingleList();
    for (const digit of x) {
      xList.pushBack(digit);
    }
    const yList = new SingleList();
    for (const digit of y) {
      yList.pushBack(digit);
    }
    const result = reverseSum(xList, yList);
    expect(result.getValues()).toStrictEqual(total);
  });

});
