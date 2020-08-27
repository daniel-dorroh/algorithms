import { throwIfNotNode } from './shared';
import { Queue } from '@dinosanjo/data-structures';

// Implement a function to check if a
// binary tree is a binary search tree.

const satisfiesBSTCondition = (node) => {
  const leftChild = node.left();
  const rightChild = node.right();
  if (node.childCount() === 1) {
    return (leftChild !== null && leftChild.value() <= node.value())
        || (rightChild !== null && rightChild.value() >= node.value());
  }
  if (node.childCount() === 2) {
    return leftChild !== null
        && leftChild.value() <= node.value()
        && rightChild !== null
        && rightChild.value() >= node.value();
  }
  return true;
}

export const isBinarySearchTree = (root) => {
  throwIfNotNode(root);
  const unprocessedNodes = new Queue();
  unprocessedNodes.enqueue(root);
  while (unprocessedNodes.size() !== 0) {
    const node = unprocessedNodes.dequeue();
    if (!satisfiesBSTCondition(node)) {
      return false;
    }
    for (const child of node.children()) {
      unprocessedNodes.enqueue(child);
    }
  }
  return true;
}
