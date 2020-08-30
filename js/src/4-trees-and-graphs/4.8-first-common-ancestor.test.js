import { findFirstCommonAncestor } from './4.8-first-common-ancestor';
import { Node } from './shared';

describe('findFirstCommonAncestor', () => {

  let r, a, x, y;

  beforeEach(() => {
    r = new Node('root');
    a = new Node('ancestor');
    x = new Node('x');
    y = new Node('y');
  });

  // Equilateral relationship
  //     r
  //   a
  // x   y
  test('returns correct ancestor for equilateral relationship', () => {
    r.addLeft(a);
    a.addLeft(x);
    a.addRight(y);
    expect(findFirstCommonAncestor(r, x, y)).toBe(a);
  });

  // Distant relative relationship
  //      r
  //    a
  //  x   n
  //        y
  test('returns correct ancestor for distant relative relationship', () => {
    const n = new Node('n');
    r.addLeft(a);
    a.addLeft(x);
    a.addRight(n);
    n.addRight(y);
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
  // r
  //   a
  //     x
  //       y
  test('returns correct ancestor for distant relative relationship', () => {
    r.addRight(a);
    a.addRight(x);
    x.addRight(y);
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
