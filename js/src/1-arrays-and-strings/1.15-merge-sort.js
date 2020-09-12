import { Queue } from '@dinosanjo/data-structures';

const merge = (list1, list2) => {
  let i = 0;
  let j = 0;
  const merged = [];
  while (i < list1.length || j < list2.length) {
    if (i === list1.length) {
      merged.push(list2[j]);
      j++;
    } else if (j === list2.length) {
      merged.push(list1[i]);
      i++;
    } else {
      if (list2[j] <= list1[i]) {
        merged.push(list2[j]);
        j++;
      } else {
        merged.push(list1[i]);
        i++;
      }
    }
  }
  return merged;
};

/**
 * Manual Test
 * Input: [3, 1, 2]
 * unprocessedLists = ->[]->
 *  item = 3, unprocessedLists = -([3])->
 *  item = 1, unprocessedLists = -([1],[3])->
 *  item = 2, unprocessedLists = -([2],[1],[3])->
 * 3 % 2 === 1 ? yep
 *  unprocessedLists = -([],[2],[1],[3])->
 * mergedList = null;
 * 4 !== 0 ? yep
 *  list1 = [3], list2 = [1], unprocessedLists = -([],[2])->
 *  [1] !== null ? yep
 *   ->merge([3], [1])
 *    i = 0, j = 0, merged = []
 *    0 < 1 ? yep
  *    0 === 1 ? nop
  *    0 === 1 ? nop
  *     1 <= 3 ? yep
  *      merged = [1], j = 1
 *    0 < 1 ? yep
 *     0 === 1 ? nop
 *     1 === 1 ? yep
 *      merged = [1, 3], i = 1
 *    1 < 1 ? nop, 1 < 1 ? nop
 *   <-[1, 3]
 *   mergedList = [1, 3], unprocessedLists = -([1, 3],[],[2])->
 * 3 !== 0 ? yep
 *  list1 = [2], list2 = [], unprocessedLists = -([1, 3])->
 *  [] !== null ? yep
 *   ->merge([2], [])
 *    i = 0, j = 0, merged = [];
 *    0 < 1 ? yep
 *     0 === 1 ? nop
 *     0 === 0 ? yep
 *      merged = [2], i = 1
 *    1 < 1 ? nop, 0 < 0 ? nop
 *   <-[2]
 *  mergedList = [2], unprocessedLists = -([2],[1, 3])->
 * 2 !== 0 ? yep
 *  list1 = [1, 3], list2 = [2], unprocessedLists = -()->
 *  [2] !== null ? yep
 *   ->merge([1,3], [2])
 *    i = 0, j = 0, merged = []
 *    0 < 2 ? yep
 *     0 === 2 ? nop
 *     0 === 1 ? nop
 *      2 <= 1 ? nop
 *      merged = [1], i = 1
 *    1 < 2 ? yep
 *     1 === 2 ? nop
 *     0 === 1 ? nop
 *      2 <= 3 ? yep
 *       merged = [1, 2], j = 1
 *    1 < 2 ? yep
 *     1 === 2 ? nop
 *     1 === 1 ? yep
 *      merged = [1, 2, 3], i = 2
 *    2 < 2 ? nop, 1 < 1 ? nop
 *   <-[1, 2, 3]
 *   mergedList = [1, 2, 3], unprocessedLists = -([1, 2, 3])->
 * 1 !== 0 ? yep
 *  list1 = [1, 2, 3], list2 = null, unprocessedLists = -()->
 *  null !== null ? nop
 *   mergedList = [1, 2, 3]
 * 0 !== 0 ? nop
 * <-[1, 2, 3]
 */

export const mergeSort = (items) => {
  const unprocessedLists = new Queue();
  for (const item of items) {
    unprocessedLists.enqueue([item]);
  }
  // If items is not even, add an empty
  // list to the queue to even out the
  // initial state
  if (items.length % 2 === 1) {
    unprocessedLists.enqueue([]);
  }
  let mergedList = [];
  while (unprocessedLists.size() !== 0) {
    const list1 = unprocessedLists.dequeue();
    const list2 = unprocessedLists.dequeue();
    if (list2 !== null) {
      mergedList = merge(list1, list2);
      unprocessedLists.enqueue(mergedList);
    } else {
      mergedList = list1;
    }
  }
  return mergedList;
};
