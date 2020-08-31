import { throwIfNotNode } from './node';

// Write an algorithm to find the next node
// of a given node in a binary search tree.
// You may assume that each node has a link
// to its parent.

const findNextAncestor = (node, parent) => {
  let largerParent = parent;
  while (largerParent !== null && largerParent.value() < node.value()) {
    largerParent = largerParent.parent();
  }
  return largerParent;
};

const findNext = (node, originalNode) => {
  const parent = node.parent();
  const leftChild = node.left();
  const rightChild = node.right();
  if (node === originalNode) {
    if (rightChild !== null) {
      return findNext(rightChild, originalNode);
    }
    if (parent !== null) {
      return findNextAncestor(node, parent);
    }
  } else if (leftChild !== null) {
    return findNext(leftChild, originalNode);
  } else {
    return node;
  }
  return null;
};

export const next = (node) => {
  throwIfNotNode(node);
  return findNext(node, node);
};
