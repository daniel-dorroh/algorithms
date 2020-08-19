import { SingleList } from '@dinosanjo/data-structures';
import { partition } from './2.4-partition';

describe('partition', () => {

  test('throws if list is not a SingleList', () => {
    expect(() => partition([1, 2, 3, 4], 4)).toThrow('list is not a SingleList');
  });

  test.each(["25", {}, [], () => 25])('throws if x is not a number', (x) => {
    expect(() => partition(new SingleList(), x)).toThrow();
  });

  test('does nothing to empty list (smoke)', () => {
    const list = new SingleList();
    partition(list, 5);
  });

  test.each([4, 5, 6])('partitions a single item list containing value %s', (value) => {
    const list = new SingleList();
    list.pushBack(value);
    partition(list, 5);
    const partitionedValues = Array.from(list).map(i => i.value);
    expect(partitionedValues).toStrictEqual([value]);
  });

  test('partitions example list', () => {
    const list = new SingleList();
    list.pushBack(3);
    list.pushBack(5);
    list.pushBack(8);
    list.pushBack(5);
    list.pushBack(10);
    list.pushBack(2);
    list.pushBack(1);
    partition(list, 5);
    const partitionedValues = Array.from(list).map(i => i.value);
    expect(partitionedValues).toStrictEqual([3, 1, 2, 5, 8, 5, 10]);
  });

  test('partitions list where first item is greater than x', () => {
    const list = new SingleList();
    list.pushBack(8);
    list.pushBack(5);
    list.pushBack(4);
    list.pushBack(3);
    list.pushBack(2);
    list.pushBack(1);
    list.pushBack(9);
    list.pushBack(10);
    partition(list, 5);
    const partitionedValues = Array.from(list).map(i => i.value);
    expect(partitionedValues).toStrictEqual([1, 2, 3, 4, 8, 5, 9, 10]);
  });

});
