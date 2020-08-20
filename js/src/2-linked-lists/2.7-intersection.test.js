import { SingleList } from '@dinosanjo/data-structures';
import { getFirstIntersectingNodeOrNull } from './2.7-intersection';

describe('getFirstIntersectingNodeOrNull', () => {

  const nonLists = [123, "15", {}, () => 25];

  test.each(nonLists)('throws if listA is not a SingleList', (listA) => {
    expect(() => getFirstIntersectingNodeOrNull(listA, new SingleList())).toThrow('listA is not a SingleList');
  });

  test.each(nonLists)('throws if listB is not a SingleList', (listB) => {
    expect(() => getFirstIntersectingNodeOrNull(new SingleList(), listB)).toThrow('listB is not a SingleList');
  });

  test('returns false for non intersecting lists', () => {
    const listA = new SingleList();
    const listB = new SingleList();
    for (let i = 0; i < 10; i++) {
      const value = Math.random() * 10;
      listA.pushBack({value});
      listB.pushBack({value});
    }
    expect(getFirstIntersectingNodeOrNull(listA, listB)).toBe(null);
  });

  test('returns true for intersecting lists', () => {
    const listA = new SingleList();
    const listB = new SingleList();
    const intersectingNode = {value: Math.random() * 10};
    const aIndex = Math.floor(Math.random() * 10);
    const bIndex = Math.floor(Math.random() * 10);
    for (let i = 0; i < 10; i++) {
      const value = Math.random() * 10;
      listA.pushBack({value});
      listB.pushBack({value});
      if (i === aIndex) {
        listA.pushBack(intersectingNode);
      }
      if (i === bIndex) {
        listB.pushBack(intersectingNode);
      }
    }
    expect(getFirstIntersectingNodeOrNull(listA, listB)).toBe(intersectingNode);
  });

});
