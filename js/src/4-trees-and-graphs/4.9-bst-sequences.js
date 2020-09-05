import { throwIfNotBinarySearchTree } from './binary-search-tree';

// A binary search tree was created by traversing
// through an array from left to right and
// inserting each element. Given a binary search
// tree with distinct elements, print all possible
// arrays that could have led to this tree.

const getOrderPreservingCombinations = (left, right, combination = []) => {
  if (left.length === 0 || right.length === 0) {
    return [combination.concat(left.concat(right))];
  }
  const nextLeft = [...left];
  const nextLeftCombination = [...combination, nextLeft.shift()];
  const leftCombinations = getOrderPreservingCombinations(nextLeft, right, nextLeftCombination);
  const nextRight = [...right];
  const nextRightCombination = [...combination, nextRight.shift()];
  const rightCombinations = getOrderPreservingCombinations(left, nextRight, nextRightCombination);
  return [...leftCombinations, ...rightCombinations];
};

const getAllSourceArrays = (node) => {
  const source = [node.value()];
  // Move down single-child regions of the tree
  // Return the source node sequence if a leaf is encountered
  while (node.childCount() <= 1) {
    if (node.left() !== null) {
      node = node.left();
    } else if (node.right() !== null) {
      node = node.right();
    } else {
      // Single-child node sequence terminated
      // in leaf, meaning the only source array
      // is the single-child node sequence.
      return [source];
    }
    source.push(node.value());
  }
  // Left and right child sequence order does not matter
  // relative to each other, so all possible source arrays
  // are the combination of left and right sequences mixed
  // together, preserving the order relative to each sequence itself.
  // Ex: [1,2,3] and [6] could have resulted from the following source arrays
  // Src: [1,2,3,6], [1,2,6,3], [1,6,2,3], [6,1,2,3]
  // However, notice that the relative ordering of 1, 2, and 3
  // remains the same. This is not a permutation.
  // If the left/right split was preceded by a single-child
  // node sequence, each combination must be preceded by this
  // sequence.
  // Ex:  5
  //       6
  //      7 8
  //    ... ...
  // The combination of subsequences starting at 7 and 8 must all
  // be preceded by [5,6] because there is no other path to those
  // subsequences.
  const sourceArrays = [];
  const leftSourceArrays = getAllSourceArrays(node.left());
  const rightSourceArrays = getAllSourceArrays(node.right());
  for (const left of leftSourceArrays) {
    for (const right of rightSourceArrays) {
      for (const combination of getOrderPreservingCombinations(left, right)) {
        sourceArrays.push([...source, ...combination]);
      }
    }
  }
  return sourceArrays;
};

export const findSourceArrays = (bst) => {
  throwIfNotBinarySearchTree(bst);
  return getAllSourceArrays(bst.root());
};
