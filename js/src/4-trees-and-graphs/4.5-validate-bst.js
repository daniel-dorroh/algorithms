import { throwIfNotNode } from './node';

// Implement a function to check if a
// binary tree is a binary search tree.

const isWithinRange = (node, min, max) => {
  if (node === null) {
    return true;
  }
  const value = node.value();
  const left = node.left();
  const right = node.right();
  return value >= min
      && value <= max
      && isWithinRange(left, min, value)
      && isWithinRange(right, value, max);
};

export const isBinarySearchTree = (root) => {
  throwIfNotNode(root);
  return isWithinRange(root.left(), Number.NEGATIVE_INFINITY, root.value())
      && isWithinRange(root.right(), root.value(), Number.POSITIVE_INFINITY);
}
