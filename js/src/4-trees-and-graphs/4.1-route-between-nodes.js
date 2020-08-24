import { Queue, HashSet } from '@dinosanjo/data-structures';
import { throwIfNullOrUndefined } from '../utility/arg-checking';

// Given a directed graph, design an algorithm to find
// out whether there is a route between two nodes.

const throwIfNodeNotOnGraph = (graph, nodeId, name) => {
  if (graph.getNode(nodeId) === null) {
    throw `${name} does not exist on graph`;
  }
};

export const doesRouteExist = (graph, node1Id, node2Id) => {
  throwIfNullOrUndefined(graph, 'graph');
  throwIfNodeNotOnGraph(graph, node1Id, 'node1Id');
  throwIfNodeNotOnGraph(graph, node2Id, 'node2Id');
  const processing = new Queue();
  const processed = new HashSet();
  for (const neighbor of graph.getNeighborNodes(node1Id)) {
    processing.enqueue(neighbor);
  }
  while (processing.size() > 0) {
    const node = processing.dequeue();
    if (processed.get(node) !== null) {
      continue;
    }
    if (node.id === node2Id) {
      return true;
    }
    for (const neighbor of graph.getNeighborNodes(node.id)) {
      processing.enqueue(neighbor);
    }
    processed.add(node);
  }
  return false;
};
