import { isBalanced } from './4.4-check-balanced';
import { toBinarySearchTree, Node } from './4.2-minimal-tree';

describe('isBalanced', () => {

  test.each([null, undefined, 123, "25", {}, [], () => true])('throws if root is not a Node', (root) => {
    expect(() => isBalanced(root)).toThrow('root is not a Node');
  });

  test('true for root without subtrees', () => {
    expect(isBalanced(new Node())).toBe(true);
  });

  test('true for perfect tree', () => {
    const root = toBinarySearchTree([1, 2, 3, 4, 5, 6, 7]);
    expect(isBalanced(root)).toBe(true);
  });

  test('true for tree imbalanced by 1', () => {
    const root = toBinarySearchTree([1, 2, 3, 4, 5]);
    expect(isBalanced(root)).toBe(true);
  });

  test('false for tree imbalanced by 2', () => {
    const root = toBinarySearchTree([1, 2, 3, 4]);
    expect(isBalanced(root)).toBe(false);
  });

  test('true for irregular tree with imbalance of 1', () => {
    const l1 = new Node(45);
    const l2 = new Node(35);
    const l3 = new Node(25);
    const n1 = new Node(65);
    const n2 = new Node(55);
    const n3 = new Node(75);
    const root = new Node(85);
    root.addLeft(n1);
    root.addRight(n3);
    n1.addLeft(l1);
    n1.addRight(n2);
    n2.addRight(l2);
    n3.addRight(l3);
    expect(isBalanced(root)).toBe(true);
  });

  test('true for irregular tree with imbalance of 2', () => {
    const root = new Node(85);
    const n1 = new Node(65);
    const n2 = new Node(55);
    const n3 = new Node(75);
    const l1 = new Node(45);
    const l2 = new Node(35);
    root.addLeft(n1);
    root.addRight(n2);
    n1.addLeft(l1);
    n2.addRight(n3);
    n3.addLeft(l2);
    expect(isBalanced(root)).toBe(false);
  });

});
