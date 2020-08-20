import { throwIfNotList } from '../utility/arg-checking';

// Given a circular linked list, implement an
// algorith that returns the node at the
// beginning of the loop. A circular linked
// list is a corrupt linked list in which a
// node's next pointer points to an earlier node,
// so as to make a loop in the linked list.

export const findBeginningOfLoop = (list) => {
  throwIfNotList(list);
  let currentPosition = 0;
  for (const item of list) {
    let searchPosition = 0;
    for (const searchItem of list) {
      if (searchPosition === currentPosition) {
        break;
      }
      if (searchItem === item) {
        return item;
      }
      searchPosition++;
    }
    currentPosition++;
  }
  return null;
};
