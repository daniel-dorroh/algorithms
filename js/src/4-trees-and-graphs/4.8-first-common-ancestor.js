
// Design an algorithm and write code to find
// the first common ancestor of two nodes in
// a binary tree. Avoid storing additional nodes
// in a data structure. Note that this is not
// necessarily a binary search tree.

import { throwIfNotNode } from './shared';

const createResult = (count, ancestor = null) => {
  return {
    count,
    ancestor,
  };
};

const search = (node, searchedNodes) => {
  let findCount = 0;
  let result = createResult(findCount);
  if (node === null) {
    return result;
  }
  const children = [node.left(), node.right()]
      .filter(n => n !== null);
  for (const child of children) {
    result = search(child, searchedNodes);
    findCount += result.count;
    if (findCount === searchedNodes.length) {
      return createResult(findCount, node);
    }
  }
  if (searchedNodes.includes(node)) {
    return createResult(findCount + 1);
  }
  return result;
};

export const findFirstCommonAncestor = (root, node1, node2) => {
  throwIfNotNode(root, 'root');
  throwIfNotNode(node1, 'node1');
  throwIfNotNode(node2, 'node2');
  const searchedNodes = [node1, node2];
  let result = search(root.left(), searchedNodes);
  if (result.ancestor !== null) {
    return result.ancestor;
  } else if (result.count === 1) {
    return root;
  }
  result = search(root.right(), searchedNodes);
  return result.ancestor;
};
