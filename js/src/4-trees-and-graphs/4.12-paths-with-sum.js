
// You are given a binary tree in which each node contains
// an integer value, which might be positive or negative.
// Design an algorithm to count the number of paths that
// sum to a given value. The path does not need to start or
// end at the root or a leaf, but it must go downwards,
// traveling only from parent nodes to child nodes.

const findPaths = (node, sum, paths, values = []) => {
  if (node === null) {
    return;
  }
  const nextValues = [...values, node.value()];
  if (nextValues.reduce((a, c) => a + c) === sum) {
    paths.push(nextValues);
  }
  findPaths(node.left(), sum, paths, nextValues);
  findPaths(node.right(), sum, paths, nextValues);
};

export const getPathsWithSum = (root, sum) => {
  let paths = [];
  findPaths(root, sum, paths);
  return paths;
};
