import { doesRouteExist } from './4.1-route-between-nodes';
import { Graph } from '@dinosanjo/data-structures';

describe('doesRouteExist', () => {

  let graph = null;
  beforeEach(() => graph = new Graph());

  test.each([null, undefined])('throws if graph is null or undefined', (graph) => {
    expect(() => doesRouteExist(graph, 2, 4)).toThrow(`graph is ${graph}`);
  });

  test('throws if node1Id does not exist on graph', () => {
    expect(() => doesRouteExist(graph, 2, 4)).toThrow('node1Id does not exist on graph');
  });

  test('throws if node2Id does not exist on graph', () => {
    const node1Id = graph.addNode(25);
    expect(() => doesRouteExist(graph, node1Id, 4)).toThrow('node2Id does not exist on graph');
  });

  describe('graphs with node1 and node2', () => {

    let node1Id, node2Id;

    beforeEach(() => {
      node1Id = graph.addNode(25);
      node2Id = graph.addNode(35);
    });

    test('returns false if no edges exist', () => {
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(false);
    });

    test('returns false if no route exists', () => {
      for (let i = 0; i < 5; i ++) {
        const node1NeighborId = graph.addNode(15 * i);
        graph.addEdge(node1Id, node1NeighborId);
      }
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(false);
    });

    test('returns true for direct connection', () => {
      graph.addEdge(node1Id, node2Id);
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(true);
    });

    test('returns true for multi-edge route', () => {
      const neighbor1Id = graph.addNode(55);
      const neighbor2Id = graph.addNode(65);
      const neighbor3Id = graph.addNode(75);
      const neighbor4Id = graph.addNode(85);
      graph.addEdge(node1Id, neighbor1Id);
      graph.addEdge(neighbor1Id, neighbor2Id);
      graph.addEdge(neighbor2Id, neighbor3Id);
      graph.addEdge(neighbor3Id, neighbor4Id);
      graph.addEdge(neighbor4Id, node2Id);
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(true);
    });

    test('returns true if multiple routes exist', () => {
      const neighbor1Id = graph.addNode(55);
      const neighbor2Id = graph.addNode(65);
      const neighbor3Id = graph.addNode(75);
      const neighbor4Id = graph.addNode(85);
      graph.addEdge(node1Id, neighbor1Id);
      graph.addEdge(neighbor1Id, neighbor2Id);
      graph.addEdge(neighbor2Id, neighbor3Id);
      graph.addEdge(neighbor3Id, neighbor4Id);
      graph.addEdge(neighbor4Id, node2Id);
      graph.addEdge(neighbor2Id, node2Id);
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(true);
    });

    test('returns true in graph with cycles', () => {
      const neighbor1Id = graph.addNode(55);
      const neighbor2Id = graph.addNode(65);
      const neighbor3Id = graph.addNode(75);
      const neighbor4Id = graph.addNode(85);
      graph.addEdge(node1Id, neighbor1Id);
      graph.addEdge(neighbor1Id, neighbor2Id);
      graph.addEdge(neighbor2Id, node1Id);
      graph.addEdge(neighbor2Id, neighbor3Id);
      graph.addEdge(neighbor3Id, neighbor4Id);
      graph.addEdge(neighbor3Id, node1Id);
      graph.addEdge(neighbor3Id, node2Id);
      expect(doesRouteExist(graph, node1Id, node2Id)).toBe(true);
    });

  });

});
