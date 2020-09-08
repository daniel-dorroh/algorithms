import { isSubtree } from './4.10-check-subtree';
import { BinarySearchTree } from './binary-search-tree';
import { Node } from './node';

describe('isSubtree', () => {

  const t1 = new BinarySearchTree([...Array(1000).keys()]);

  test('false if not a subtree', () => {
    const t2 = new BinarySearchTree();
    t2.insert(1001);
    expect(isSubtree(t1, t2)).toBe(false);
  });

  test('false if a partial match subtree', () => {
    const t2 = new BinarySearchTree();
    t2.insert(511);
    t2.insert(255);
    t2.insert(767);
    t2.insert(127);
    t2.insert(383);
    t2.insert(896);
    expect(isSubtree(t1, t2)).toBe(false);
  });

  //   t1       t2
  //   ...       5
  //  1   5     4 6
  // 0 2 4 6   0
  test('false if subtree has extra items', () => {
    const t2 = new BinarySearchTree();
    t2.insert(5);
    t2.insert(4);
    t2.insert(6);
    t2.insert(0);
    expect(isSubtree(t1, t2)).toBe(false);
  });

  test('true if single node subtree', () => {
    const t2 = new BinarySearchTree();
    t2.insert(500);
    expect(isSubtree(t1, t2)).toBe(true);
  });

  test('true if multi-node perfect subtree', () => {
    const t2 = new BinarySearchTree();
    t2.insert(511);
    t2.insert(255);
    t2.insert(767);
    t2.insert(127);
    t2.insert(383);
    t2.insert(639);
    t2.insert(895);
    expect(isSubtree(t1, t2)).toBe(true);
  });

  test('true if multi-node uneven subtree', () => {
    const root = new Node(767);
    const c1 = new Node(895);
    root.addRight(c1);
    const t2 = new BinarySearchTree([], root);
    expect(isSubtree(t1, t2)).toBe(true);
  });

});
