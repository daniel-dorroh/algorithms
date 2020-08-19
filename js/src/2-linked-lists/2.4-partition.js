import { SingleList } from '@dinosanjo/data-structures';
import { throwIfNotType } from '../utility/arg-checking';

// Write code to partition a linked
// list around a value x, such that
// all nodes less than x come before
// all nodes greater than or equal to x.
// If x is contained with the list, the
// values of x only need to be after
// the elements less than x. The partition
// element x can appear anywhere in the
// 'right partition;' it does not need to
// appear between the left and right partitions.
//
// Example
//  Input: partition(3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1, 5)
//  Output: 3 -> 1 -> 2 ->10 -> 5 -> 5 -> 8

export const partition = (list, x) => {
  if (!(list instanceof SingleList )) {
    throw 'list is not a SingleList';
  }
  throwIfNotType(x, 'number', 'x');
  let firstSectionEndId = null;
  let isPartitionFound = false;
  for (const item of list) {
    if (item.value >= x) {
      if (!isPartitionFound) {
        isPartitionFound = true;
      }
      continue;
    }
    if (!isPartitionFound) {
      firstSectionEndId = item.id;
      continue;
    }
    if (firstSectionEndId === null) {
      list.pushFront(item.value);
    } else {
      list.insertAfter(firstSectionEndId, item.value);
    }
    list.delete(item.id);
  }
};
