import { Node } from './shared';
import { toBinarySearchTree } from './4.2-minimal-tree';
import { isBinarySearchTree } from './4.5-validate-bst';

describe('isBinarySearchTree', () => {

  test.each([123, "25", {}, [], () => true])('throws if root is not a Node', (root) => {
    expect(() => isBinarySearchTree(root)).toThrow();
  });

  test('true for tree with only root', () => {
    expect(isBinarySearchTree(new Node(25))).toBe(true);
  });

  test('true for trees constructed using toBinarySearchTree', () => {
    const values = [0];
    for (let i = 1; i < 500; i++) {
      values.push(i);
      expect(isBinarySearchTree(toBinarySearchTree(values))).toBe(true);
    }
  });

  test('true for irregular tree that satisfies the BST condition', () => {
    const root = new Node(5);
    const n1 = new Node(3);
    const n2 = new Node(4);
    const l1 = new Node(3.5);
    const n3 = new Node(9);
    const n4 = new Node(11);
    const l2 = new Node(10);
    const l3 = new Node(13);
    root.addLeft(n1);
    root.addRight(n3);
    n1.addRight(n2);
    n2.addLeft(l1);
    n3.addRight(n4);
    n4.addLeft(l2);
    n4.addRight(l3);
    expect(isBinarySearchTree(root)).toBe(true);
  });

  test('true for tree of only one value', () => {
    const root = new Node(5);
    const n1 = new Node(5);
    const n2 = new Node(5);
    const l1 = new Node(5);
    const l2 = new Node(5);
    root.addLeft(n1);
    n1.addLeft(n2);
    n1.addRight(l2);
    n2.addLeft(l1);
    expect(isBinarySearchTree(root)).toBe(true);
  });

  test('false for binary tree that is not a binary search tree', () => {
    const root = new Node(5);
    const n1 = new Node(7);
    const n2 = new Node(4);
    root.addLeft(n1);
    root.addRight(n2);
    expect(isBinarySearchTree(root)).toBe(false);
  });

  test('false for binary tree with left subtree containing value greater than root', () => {
    const root = new Node(5);
    const n1 = new Node(2);
    const n2 = new Node(7);
    const l1 = new Node(1);
    const n3 = new Node(3);
    const l2 = new Node(6);
    root.addLeft(n1);
    root.addRight(n2);
    n1.addLeft(l1);
    n1.addRight(n3);
    n3.addRight(l2);
    expect(isBinarySearchTree(root)).toBe(false);
  });

  test('false for binary tree with right subtree containing value less than root', () => {
    const root = new Node(5);
    const n1 = new Node(2);
    const n2 = new Node(7);
    const l1 = new Node(6);
    const n3 = new Node(9);
    const l2 = new Node(4);
    const l3 = new Node(10);
    root.addLeft(n1);
    root.addRight(n2);
    n2.addLeft(l1);
    n2.addRight(n3);
    n3.addLeft(l2);
    n3.addRight(l3);
    expect(isBinarySearchTree(root)).toBe(false);
  });

});
