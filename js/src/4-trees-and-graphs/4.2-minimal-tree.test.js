import { toBinarySearchTree, getOptimumHeight } from './4.2-minimal-tree';

describe('toBinarySearchTree', () => {

  test('throws if ascendingValues is empty', () => {
    expect(() => toBinarySearchTree([])).toThrow('ascendingValues has no values');
  });

  test.each([123, "25", {}, () => true])('throws if ascendingValues is not an array', (ascendingValues) => {
    expect(() => toBinarySearchTree(ascendingValues)).toThrow();
  });

  test('returns single node for array of length 1', () => {
    const root = toBinarySearchTree([1]);
    expect(root.value()).toBe(1);
    expect(root.left()).toBeNull();
    expect(root.right()).toBeNull();
  });

  test('creates a binary search tree with height 5', () => {
    const root = toBinarySearchTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
    expect(root.value()).toBe(15);
    expect(root.left().value()).toBe(7);
    expect(root.left().left().value()).toBe(3);
    expect(root.left().left().left().value()).toBe(1);
    expect(root.left().left().left().left().value()).toBe(0);
    expect(root.left().left().left().right().value()).toBe(2);
    expect(root.left().left().right().value()).toBe(5);
    expect(root.left().left().right().left().value()).toBe(4);
    expect(root.left().left().right().right().value()).toBe(6);
    expect(root.left().right().value()).toBe(11);
    expect(root.left().right().left().value()).toBe(9);
    expect(root.left().right().left().left().value()).toBe(8);
    expect(root.left().right().left().right().value()).toBe(10);
    expect(root.left().right().right().value()).toBe(13);
    expect(root.left().right().right().left().value()).toBe(12);
    expect(root.left().right().right().right().value()).toBe(14);
    expect(root.right().value()).toBe(19);
    expect(root.right().left().value()).toBe(17);
    expect(root.right().left().left().value()).toBe(16);
    expect(root.right().left().right().value()).toBe(18);
    expect(root.right().right().value()).toBe(21);
    expect(root.right().right().left().value()).toBe(20);
  });

});

describe('getOptimumHeight', () => {

  test.each([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 2],
        [5, 3],
        [7, 3],
        [15, 4],
        [31, 5],
        [63, 6],
        [127, 7],
      ])('returns shortest height required to fit all items', (itemCount, height) => {
    expect(getOptimumHeight(itemCount)).toBe(height);
  });

});
