import { findSourceArrays, printSourceArrays } from './4.9-bst-sequences';
import { BinarySearchTree } from './binary-search-tree';

describe('findSourceArrays', () => {

  test.each([123, "25", {}, [], () => true])('throws if bst is not a BinarySearchTree', (bst) => {
    expect(() => findSourceArrays(bst)).toThrow('bst is not a BinarySearchTree');
  });

  test('finds the source array used to construct the tree', () => {
    const source = [0, 5, 6, 1, 7, 9, 1, 2, 4, 10, 7, 21, 3, 3, 1, 5];
    const bst = new BinarySearchTree();
    for (const value of source) {
      bst.insert(value);
    }
    const possibleSourceArrays = findSourceArrays(bst);
    expect(possibleSourceArrays).toContainEqual(source);
  });

});
