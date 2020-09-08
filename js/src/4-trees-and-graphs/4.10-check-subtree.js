import { throwIfNotBinarySearchTree } from './binary-search-tree';

// T1 and T2 are two very large binary trees,
// with T1 much bigger than T2. Create an
// algorithm to determine if T2 is a subtree of T1.
// A tree T2 is a subtree of T1 if there exists a
// node n in T1 such that the subtree of n is
// identical to T2. That is, if you cut off the
// tree at node n, the two trees would be identical.

const isSubtreeAtNode = (root, node) => {
  if (root === null) {
    return true;
  }
  if (root !== null && node === null) {
    return false;
  }
  if (root.value() !== node.value()) {
    return false;
  } else if (root.childCount() === 0) {
    return true;
  } else {
    return isSubtreeAtNode(root.left(), node.left())
        && isSubtreeAtNode(root.right(), node.right());
  }
};

export const isSubtree = (t1, t2) => {
  throwIfNotBinarySearchTree(t1, 't1');
  throwIfNotBinarySearchTree(t2, 't2');
  const t2Root = t2.root();
  for (const t1Node of t1.getPreOrderIterator()) {
    if (t1Node.value() === t2Root.value()) {
      if (isSubtreeAtNode(t2Root, t1Node)) {
        return true;
      }
    }
  }
  return false;
};
