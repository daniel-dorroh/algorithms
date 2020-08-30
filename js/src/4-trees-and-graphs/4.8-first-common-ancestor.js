
// Design an algorithm and write code to find
// the first common ancestor of two nodes in
// a binary tree. Avoid storing additional nodes
// in a data structure. Note that this is not
// necessarily a binary search tree.

const search = (node, searchedNodes) => {
  if (node === null) {
    return 0;
  }
  let findCount = 0;
  let result = search(node.left(), searchedNodes);
  if (!Number.isInteger(result)) {
    return result;
  } else {
    findCount += result;
  }
  if (findCount === searchedNodes.length) {
    return node;
  }
  result = search(node.right(), searchedNodes);
  if (!Number.isInteger(result)) {
    return result;
  } else {
    findCount += result;
  }
  if (findCount === searchedNodes.length) {
    return node;
  }
  if (searchedNodes.includes(node)) {
    return findCount + 1;
  }
  return result;
};

export const findFirstCommonAncestor = (root, node1, node2) => {
  const searchedNodes = [node1, node2];
  let commonAncestor = search(root.left(), searchedNodes);
  if (!Number.isInteger(commonAncestor)) {
    return commonAncestor;
  } else if (commonAncestor === 1) {
    return root;
  }
  commonAncestor = search(root.right(), searchedNodes);
  return commonAncestor;
};
