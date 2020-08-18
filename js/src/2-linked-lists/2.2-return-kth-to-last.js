import { SingleList } from '@dinosanjo/data-structures';
import { throwIfNotType } from '../utility/arg-checking';

// Implement an algorithm to find the kth
// to last element of a singly linked list.

export const getKthToLast = (list, k) => {
  if (!(list instanceof SingleList )) {
    throw 'list is not a SingleList';
  }
  throwIfNotType(k, 'number', 'k');
  if (!Number.isInteger(k)) {
    throw 'k is not an integer';
  }
  if (k < 1) {
    throw 'k is smaller than the minimum, 1';
  }
  if (k > list.size()) {
    throw 'k is larger than list';
  }
  // My implementation of a singly linked list keeps
  // track of the number of elements globally, so I could
  // have taken advantage of that property to solve this
  // in a simpler way, but I figured the way the author
  // wanted me to solve it involved this racing iterator
  // method.
  let primaryIterator = list.getIterator();
  let secondaryIterator = list.getIterator();
  while (!primaryIterator.next().done) {
    if (k < 1) {
      secondaryIterator.next();
    }
    k--;
  }
  return secondaryIterator.next().value.value;
};
