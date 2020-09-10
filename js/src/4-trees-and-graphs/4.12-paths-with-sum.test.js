import { getPathsWithSum } from './4.12-paths-with-sum';
import { Node } from './node';

describe('getPathsWithSum', () => {

  test('returns paths with sum', () => {
    const root = new Node(5);
    const c1 = new Node(-5);
    const c2 = new Node(5);
    root.addLeft(c1);
    c1.addRight(c2);
    const paths = getPathsWithSum(root, 5);
    expect(paths).toContainEqual([5]);
    expect(paths).toContainEqual([5, -5, 5]);
  });

});
