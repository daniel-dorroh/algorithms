import { Queue } from '@dinosanjo/data-structures';
import { throwIfNotNode } from './node';

// Implement a function to check if a binary tree
// is balanced. For the purposes of this question,
// a balanced tree is defined to be a tree such
// that the heights of the two subtrees of any
// node never differ by more than one.

export const isBalanced = (root) => {
  throwIfNotNode(root, 'root');
  const uncheckedNodes = new Queue();
  uncheckedNodes.enqueue(root);
  while (uncheckedNodes.size() !== 0) {
    const node = uncheckedNodes.dequeue();
    if (node.left() !== null && node.right() !== null) {
      uncheckedNodes.enqueue(node.left());
      uncheckedNodes.enqueue(node.right());
      continue;
    } else if (node.left() !== null) {
      if (node.left().childCount() !== 0) {
        return false;
      }
    } else if (node.right() !== null) {
      if (node.right().childCount() !== 0) {
        return false;
      }
    }
  }
  return true;
};
