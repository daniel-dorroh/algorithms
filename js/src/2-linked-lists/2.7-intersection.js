import { SingleList } from '@dinosanjo/data-structures';
import { throwIfNotList } from '../utility/arg-checking';

// Given two singly linked lists, determine
// if the two lists intersect. Return the
// intersecting node. Note that the intersection
// is defined based on reference, not value.
// That is, if the kth node of the first linked
// list is the exact same node as the jth node
// of the second linked list, they are intersecting.

export const getFirstIntersectingNodeOrNull = (listA, listB) => {
  throwIfNotList(listA, 'listA');
  throwIfNotList(listB, 'listB');
  for (const {value: a} of listA) {
    for (const {value: b} of listB) {
      if (a === b) {
        return a;
      }
    }
  }
  return null;
};
