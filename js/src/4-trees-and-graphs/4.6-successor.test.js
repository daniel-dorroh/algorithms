import { next } from './4.6-successor';
import { Node } from './node';

describe('next', () => {

  const root = new Node(5);
  let n1, n2, n3, n4, n5;
  let l1, l2, l3, l4, l5;
  const valueMapping = new Map();

  beforeAll(() => {
    // Builds tree:
    //        5
    //    2        7
    // 1     3  6     9
    //        4     8  12
    //                11
    n1 = new Node(2, root);
    n2 = new Node(7, root);
    n3 = new Node(3, n1);
    n4 = new Node(9, n2);
    n5 = new Node(12, n4);
    l1 = new Node(1, n1);
    l2 = new Node(4, n3);
    l3 = new Node(6, n2);
    l4 = new Node(8, n4);
    l5 = new Node(11, n5);
    root.addLeft(n1);
    root.addRight(n2);
    n1.addLeft(l1);
    n1.addRight(n3);
    n2.addLeft(l3);
    n2.addRight(n4);
    n3.addRight(l2);
    n4.addLeft(l4);
    n4.addRight(n5);
    n5.addLeft(l5);
    valueMapping.set(1, l1);
    valueMapping.set(2, n1);
    valueMapping.set(3, n3);
    valueMapping.set(4, l2);
    valueMapping.set(5, root);
    valueMapping.set(6, l3);
    valueMapping.set(7, n2);
    valueMapping.set(9, n4);
    valueMapping.set(8, l4);
    valueMapping.set(12, n5);
    valueMapping.set(11, l5);
    valueMapping.set(13, null);
  });

  test.each([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [9, 11],
        [11, 12],
        [12, 13],
      ])('returns the next node given starting point', (start, end) => {
    const startNode = valueMapping.get(start);
    const nextNode = valueMapping.get(end);
    expect(next(startNode)).toBe(nextNode);
  });

});
