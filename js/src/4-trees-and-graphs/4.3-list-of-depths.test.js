import { Node } from './shared';
import { toBinarySearchTree } from './4.2-minimal-tree';
import { getNodesByDepth } from './4.3-list-of-depths';

describe('getNodesByDepth', () => {

  test.each([null, undefined])('returns empty list for null or undefined root', (root) => {
    expect(getNodesByDepth(root)).toStrictEqual([]);
  });

  test.each([123, "25", {}, [], () => true])('throws if root is not a Node', (root) => {
    expect(() => getNodesByDepth(root)).toThrow('root is not a Node');
  });

  test('returns list of one list containing node for single node tree', () => {
    const root = new Node(25);
    const nodes = getNodesByDepth(root);
    expect(nodes).toHaveLength(1);
    expect(nodes[0][0]).toStrictEqual(root);
  });

  test('returns list of two lists for two level tree', () => {
    const root = new Node(25);

    const children = [new Node(35), new Node(45)];
    root.addLeft(children[0]);
    root.addRight(children[1]);
    const nodes = getNodesByDepth(root);
    expect(nodes).toHaveLength(2);
    expect(nodes[0][0]).toStrictEqual(root);
    expect(nodes[1]).toStrictEqual(children);
  });

  test('returns the correct list of node lists', () => {
    const root = toBinarySearchTree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
    const nodes = getNodesByDepth(root);
    expect(nodes).toHaveLength(5);
    expect(nodes[0]).toHaveLength(1);
    expect(nodes[1]).toHaveLength(2);
    expect(nodes[2]).toHaveLength(4);
    expect(nodes[3]).toHaveLength(7);
    expect(nodes[4]).toHaveLength(8);
  });

});
