
// A binary search tree was created by traversing
// through an array from left to right and
// inserting each element. Given a binary search
// tree with distinct elements, print all possible
// arrays that could have led to this tree.

import { throwIfNotBinarySearchTree } from './binary-search-tree';

const getPossibleInOrderCombinations = (leftSource, rightSource) => {
  const getCombinations = (left, right, combinations, combination = []) => {
    if (left.length === 0 || right.length === 0) {
      combinations.push(combination.concat(left.concat(right)));
      return;
    }
    const modifiedLeft = [...left];
    let modifiedCombination = [...combination];
    const firstLeft = modifiedLeft.shift();
    modifiedCombination.push(firstLeft);
    getCombinations(modifiedLeft, right, combinations, modifiedCombination);
    const modifiedRight = [...right];
    modifiedCombination = [...combination];
    const firstRight = modifiedRight.shift();
    modifiedCombination.push(firstRight);
    getCombinations(left, modifiedRight, combinations, modifiedCombination);
  };
  const sourceCombinations = [];
  getCombinations(leftSource, rightSource, sourceCombinations);
  return sourceCombinations;
};

const getAllSourceArrays = (node) => {
  const source = [];
  source.push(node.value());
  while (node.left() === null || node.right() === null) {
    if (node.left() !== null) {
      node = node.left();
    } else if (node.right() !== null) {
      node = node.right();
    } else {
      return [source];
    }
    source.push(node.value());
  }
  const sourceArrays = [];
  const leftSourceArrays = getAllSourceArrays(node.left());
  const rightSourceArrays = getAllSourceArrays(node.right());
  for (const leftSource of leftSourceArrays) {
    for (const rightSource of rightSourceArrays) {
      for (const combination of getPossibleInOrderCombinations(leftSource, rightSource)) {
        sourceArrays.push([...source, ...combination]);
      }
    }
  }
  return sourceArrays;
};

export const findSourceArrays = (bst) => {
  throwIfNotBinarySearchTree(bst);
  const root = bst.root();
  return getAllSourceArrays(root);
};
