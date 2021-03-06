import { findFirstCommonAncestor } from './4.8-first-common-ancestor';
import { Node } from './node';

describe('findFirstCommonAncestor', () => {

  let r, a, x, y;
  const nonNodes = [123, "25", {}, [], () => true];

  beforeEach(() => {
    r = new Node('root');
    a = new Node('ancestor');
    x = new Node('x');
    y = new Node('y');
  });

  test.each(nonNodes)('throws if root is not a Node', (root) => {
    expect(() => findFirstCommonAncestor(root, x, y)).toThrow();
  });

  test.each(nonNodes)('throws if node1 is not a Node', (node1) => {
    expect(() => findFirstCommonAncestor(r, node1, y)).toThrow();
  });

  test.each(nonNodes)('throws if node2 is not a Node', (node2) => {
    expect(() => findFirstCommonAncestor(r, x, node2)).toThrow();
  });

  // Parent relationship
  //     r
  //   a
  // x   y
  test('returns correct ancestor for parent relationship', () => {
    r.addLeft(a);
    a.addLeft(x);
    a.addRight(y);
    expect(findFirstCommonAncestor(r, x, y)).toBe(a);
  });

  // Distant relative relationship
  //        r
  //      a
  //    n1 n2
  //  x      n3
  //           y
  test('returns correct ancestor for distant relative relationship', () => {
    const n1 = new Node('n1');
    const n2 = new Node('n2');
    const n3 = new Node('n3');
    r.addLeft(a);
    a.addLeft(n1);
    a.addRight(n2);
    n1.addLeft(x);
    n2.addRight(n3);
    n3.addRight(y);
    expect(findFirstCommonAncestor(r, x, y)).toBe(a);
  });

  // Left side parent-grandparent relationship
  //       r
  //     a
  //   x
  // y
  test('returns correct ancestor for distant relative relationship', () => {
    r.addLeft(a);
    a.addLeft(x);
    x.addLeft(y);
    expect(findFirstCommonAncestor(r, x, y)).toBe(a);
  });

  // Right side parent-grandparent relationship
  //   r
  //     a
  //   n1  x
  // n2 n3   y
  //   n4
  test('returns correct ancestor for distant relative relationship', () => {
    const n1 = new Node('n1');
    const n2 = new Node('n2');
    const n3 = new Node('n3');
    const n4 = new Node('n4');
    r.addRight(a);
    a.addLeft(n1);
    a.addRight(x);
    x.addRight(y);
    n1.addLeft(n2);
    n1.addRight(n3);
    n3.addLeft(n4);
    expect(findFirstCommonAncestor(r, x, y)).toBe(a);
  });

  // Root is ancestor relationship
  //   r
  // x   n
  //       y
  test('returns correct ancestor for tree with root as ancestor', () => {
    r.addLeft(x);
    const n = new Node('n');
    r.addRight(n);
    n.addRight(y);
    expect(findFirstCommonAncestor(r, x, y)).toBe(r);
  });

});
