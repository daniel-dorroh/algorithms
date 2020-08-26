import { throwIfNotArray } from '../utility/arg-checking';

// Given a sorted ascending array with unique
// integer elements, write an algorithm to
// create a binary search tree with minimal height.

export class Node {

  constructor(value) {
    this.value_ = value;
    this.children_ = [];
  }

  value() {
    return this.value_;
  }

  left() {
    return this.children_.length >= 1 ? this.children_[0] : null;
  }

  right() {
    return this.children_.length === 2 ? this.children_[1] : null;
  }

  addLeft(value) {
    this.children_[0] = value;
  }

  addRight(value) {
    this.children_[1] = value;
  }

}

export const getOptimumHeight = (valueCount) => {
  if (valueCount === 0) {
    return 0;
  }
  return Math.ceil(0.1 / valueCount + Math.log2(valueCount));
};

const getFilledSubTreeSize = (height) => Math.pow(2, height) / 2 - 1;

const getTreeInfo = (values, leftmostI, height) => {
  let rootIndex = getFilledSubTreeSize(height) + leftmostI;
  if (rootIndex >= values.length && height > 0) {
    const nextRoot = getTreeInfo(values, leftmostI, height - 1);
    rootIndex = nextRoot.rootIndex;
    height = nextRoot.height;
  }
  return {rootIndex, height};
};

const buildTree = (values, leftmostI, rightmostI, height) => {
  if (leftmostI > rightmostI || rightmostI < leftmostI) {
    return null;
  }
  const treeInfo = getTreeInfo(values, leftmostI, height);
  const rootIndex = treeInfo.rootIndex;
  height = treeInfo.height;
  const rootNode = new Node(values[rootIndex]);
  if (leftmostI === rightmostI) {
    return rootNode;
  }
  const leftNode = buildTree(values, leftmostI, rootIndex - 1, height - 1);
  if (leftNode !== null) {
    rootNode.addLeft(leftNode);
  }
  const rightNode = buildTree(values, rootIndex + 1, rightmostI, height - 1);
  if (rightNode !== null) {
    rootNode.addRight(rightNode);
  }
  return rootNode;
};

export const toBinarySearchTree = (ascendingValues) => {
  throwIfNotArray(ascendingValues);
  const itemCount = ascendingValues.length;
  if (itemCount === 0) {
    throw 'ascendingValues has no values';
  }
  const height = getOptimumHeight(itemCount);
  return buildTree(ascendingValues, 0, ascendingValues.length - 1, height);
};
