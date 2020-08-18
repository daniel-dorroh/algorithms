// Write code to remove duplicates
// from an unsorted linked list.
// How would you solve this problem
// if a temporary buffer is not allowed?

// Note: assumes linked list interface from
// @dinosanjo/data-structures.

export const removeDuplicates = (list) => {
  for (const referenceItem of list) {
    if (referenceItem.next !== null) {
      for (const item of list.getIterable(referenceItem.next)) {
        if (referenceItem.value === item.value) {
          list.delete(item.id);
        }
      }
    }
  }
};
