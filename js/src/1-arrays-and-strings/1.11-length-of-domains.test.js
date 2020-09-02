import { findDomainLengths } from './1.11-length-of-domains';

describe('findDomainLengths', () => {

  test.each([123, "abc", {}, () => true])('throws if labels is not an array', (labels) => {
    expect(() => findDomainLengths(labels)).toThrow();
  });

  test('returns correct domain lengths for single-label domains', () => {
    expect(findDomainLengths([1, 2, 3, 4])).toStrictEqual([1, 1, 1, 1]);
  });

  test('returns domain lengths for two domains', () => {
    expect(findDomainLengths([1, 2, 3, 1, 3, 2, 1, 4, 6, 6, 5, 4, 5, 4, 4])).toStrictEqual([7, 8]);
  });

  test('allows for separate but repeated domains', () => {
    expect(findDomainLengths([1, 2, 3, 1, 4, 5, 6, 5, 4, 1, 2, 3, 1])).toStrictEqual([4, 5, 4]);
  });

});
