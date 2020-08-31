import { throwIfNotNode } from './node';

// Given a binary tree, design an algorithm
// that creates linked lists of all the
// nodes at each depth.

const processDepth = (nodes, atDepthNodes, depth) => {
  nodes[depth] = [];
  const nextAtDepthNodes = [];
  for (const node of atDepthNodes) {
    nodes[depth].push(node);
    const left = node.left();
    if (left !== null) {
      nextAtDepthNodes.push(left);
    }
    const right = node.right();
    if (right !== null) {
      nextAtDepthNodes.push(right);
    }
  }
  if (nextAtDepthNodes.length > 0) {
    processDepth(nodes, nextAtDepthNodes, depth + 1);
  }
};

export const getNodesByDepth = (root) => {
  const nodes = [];
  if (root === null || root === undefined) {
    return nodes;
  }
  throwIfNotNode(root, 'root');
  processDepth(nodes, [root], 0);
  return nodes;
};
