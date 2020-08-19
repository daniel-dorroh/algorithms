import { SingleList } from '@dinosanjo/data-structures';
import { isPalindrome } from './2.6-palindrome';

const fromArray = (values) => {
  const list = new SingleList();
  for (const value of values) {
    list.pushBack(value);
  }
  return list;
}

describe('isPalindrome', () => {

  test.each([123, "25", {}, () => true])('throws if list is not a SingleList', (list) => {
    expect(() => isPalindrome(list)).toThrow('list is not a SingleList');
  });

  test.each([
        '[1, 1, 2]',
        '[1, 1, 2, 2]',
        '[1, 1, 1, 2, 2]',
      ])('true for palindrome list', (values) => {
    const list = fromArray(JSON.parse(values));
    expect(isPalindrome(list)).toBe(true);
  });

  test.each([
        '[1, 2]',
        '[1, 1, 2, 2, 2, 3]',
        '[1, 2, 3]',
      ])('false for non-palindrome list', (values) => {
    const list = fromArray(JSON.parse(values));
    expect(isPalindrome(list)).toBe(false);
  });

});
