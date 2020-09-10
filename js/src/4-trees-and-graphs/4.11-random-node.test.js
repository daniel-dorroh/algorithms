import { BinarySearchTree, numericCompare } from './4.11-random-node';

describe('numericCompare', () => {

  test('returns 0 if x and y are equal', () => {
    expect(numericCompare(1, 1)).toBe(0);
  });

  test('returns -1 if x is less than y', () => {
    expect(numericCompare(1, 2)).toBe(-1);
  });

  test('returns 1 if x is greater than y', () => {
    expect(numericCompare(2, 1)).toBe(1);
  });

});

describe('getRandomNode', () => {

  const bst = new BinarySearchTree(null, [...Array(1000).keys()]);

  test('histogram of node IDs has a flat distribution', () => {
    const map = new Map();
    for (let i = 0; i < 100_000; i++) {
      const node = bst.getRandomNode();
      if (!map.has(node.id)) {
        map.set(node.id, 1);
      } else {
        const count = map.get(node.id) + 1;
        map.set(node.id, count);
      }
    }
    const distinctBins = [...map.values()].filter((v, i, a) => a.indexOf(v) === i);
    const min = distinctBins.reduce((a, c) => c <= a ? c : a);
    const max = distinctBins.reduce((a, c) => c >= a ? c : a);
    expect(max - min).toBeLessThanOrEqual(1);
  });

});

describe('insertValue', () => {

  test.each([null, undefined])('throws if null or undefined', (value) => {
    expect(() => new BinarySearchTree().insertValue(value)).toThrow();
  });

  test('inserts value node and returns node', () => {
    const bst = new BinarySearchTree();
    const value = 25;
    const valueNode = bst.insertValue(value);
    expect(valueNode.value()).toBe(value);
  });

  test('inserts values with correct hierarchy', () => {
    const bst = new BinarySearchTree();
    const root = bst.insertValue(5);
    const left = bst.insertValue(3);
    const right = bst.insertValue(7);
    expect(root.left()).toBe(left);
    expect(root.right()).toBe(right);
    expect(left.parent()).toBe(root);
    expect(right.parent()).toBe(root);
  });

});

describe('insert', () => {

  test.each([null, undefined])('throws if null or undefined', (value) => {
    expect(() => new BinarySearchTree().insert(value)).toThrow();
  });

});

describe('find', () => {

  const bst = new BinarySearchTree(null, [...Array(1000).keys()]);

  test('returns null for nonexistent value', () => {
    expect(bst.find(1001)).toBeNull();
  });

  test.each([0, 25, 400, 550, 780, 999])('returns node value for found value', (value) => {
    const nodeValue = bst.find(value);
    expect(nodeValue.value()).toBe(value);
  });

});

describe('deleteFirst', () => {

  test.each([null, undefined])('does not smoke if null or undefined', (value) => {
    expect(() => new BinarySearchTree().deleteFirst(value)).not.toThrow();
  });

  test('deletes one instance of the value', () => {
    const bst = new BinarySearchTree(null, [...Array(10).keys()]);
    bst.insertValue(5);
    bst.deleteFirst(5);
    expect(bst.find(5)).not.toBeNull();
    bst.deleteFirst(5);
    expect(bst.find(5)).toBeNull();
  });

  test('deletes root in single node tree', () => {
    const bst = new BinarySearchTree();
    bst.insertValue(5);
    bst.deleteFirst(5);
    expect(bst.root()).toBeNull();
  });

  test('does nothing if value does not exist', () => {
    const bst = new BinarySearchTree();
    bst.insertValue(5);
    bst.insertValue(10);
    bst.insertValue(155);
    bst.deleteFirst(12);
    expect(Array.from(bst.getIterator()).map(n => n.value()))
        .toStrictEqual([5, 10, 155]);
  });

  test('correctly graphs left subtree', () => {
    const bst = new BinarySearchTree();
    bst.insertValue(5);
    bst.insertValue(4);
    bst.insertValue(3);
    bst.insertValue(1);
    bst.insertValue(2);
    bst.insertValue(0);
    bst.deleteFirst(4);
    expect(Array.from(bst.getIterator()).map(n => n.value()))
        .toStrictEqual([0, 1, 2, 3, 5]);
  });

  test('correctly graphs right subtree', () => {
    const bst = new BinarySearchTree();
    bst.insertValue(5);
    bst.insertValue(7);
    bst.insertValue(6);
    bst.insertValue(9);
    bst.insertValue(8);
    bst.insertValue(10);
    bst.deleteFirst(7);
    expect(Array.from(bst.getIterator()).map(n => n.value()))
        .toStrictEqual([5, 6, 8, 9, 10]);
  });

});

describe('delete', () => {

  test.each([null, undefined])('does not smoke if null or undefined', (value) => {
    expect(() => new BinarySearchTree().delete(value)).not.toThrow();
  });

  test('deletes all instances of the value', () => {
    const bst = new BinarySearchTree(null, [...Array(10).keys()]);
    bst.insertValue(5);
    bst.delete(5);
    expect(bst.find(5)).toBeNull();
  });

});

describe('getIterator', () => {

  test('gets default iterator at root', () => {
    const bst = new BinarySearchTree();
    bst.insertValue(5);
    for (const node of bst.getIterator()) {
      expect(node.value()).toBe(5);
    }
  });

  test('yields values for in-order traversal', () => {
    const bst = new BinarySearchTree();
    const values = [5, 3, 7, 2, 0, 1, 4, 6, 9, 10, 8];
    for (const value of values) {
      bst.insertValue(value);
    }
    expect(Array.from(bst.getIterator()).map(n => n.value()))
        .toStrictEqual(values.sort(numericCompare));
  });

  test('yields nothing for empty tree', () => {
    const bst = new BinarySearchTree();
    expect(() => {
      for (const node of bst.getIterator()) {
        throw 'did not return nothing';
      }
    }).not.toThrow();
  });

});
