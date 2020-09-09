import { BinarySearchTree } from './4.11-random-node';

describe('getRandomNode', () => {

  const bst = new BinarySearchTree(null, [...Array(1000).keys()]);

  test('histogram of node IDs has a flat distribution', () => {
    const map = new Map();
    for (let i = 0; i < 100_000; i++) {
      const node = bst.getRandomNode();
      if (!map.has(node.id)) {
        map.set(node.id, 1);
      } else {
        const count = map.get(node.id) + 1;
        map.set(node.id, count);
      }
    }
    const distinctBins = [...map.values()].filter((v, i, a) => a.indexOf(v) === i);
    const min = distinctBins.reduce((a, c) => c <= a ? c : a);
    const max = distinctBins.reduce((a, c) => c >= a ? c : a);
    expect(max - min).toBeLessThanOrEqual(1);
  });

});
