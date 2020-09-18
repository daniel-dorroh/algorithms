
const initializeCursors = (head, k) => {
  // The 'small' cursor
  let s = null;
  // The 'equal' cursor
  let e = null;
  // The 'big' cursor
  const b = head;
  // The 'current' cursor
  const c = head.next;
  if (head.value <= k) {
    e = head;
    if (head.value < k) {
      s = head;
    }
  }
  return {c, s, e, b};
};

const remove = (node, reference) => {
  reference.next = node.next;
  node.next = null;
};

const insertAfter = (node, reference, head) => {
  if (reference === null) {
    node.next = head;
    return node;
  } else {
    const next = reference.next;
    reference.next = node;
    node.next = next;
  }
  return head;
};

const safeGetNext = (node, head) => {
  if (node === null) {
    return head;
  }
  return node.next;
};

// Initialization:
//  Select initial cursor values based on k's relationship to head.
//  b is always head, and c is always head.next;
//  if head is equal to or less than k, e is also head
//  if head is less than k, s is also head
//  c is the cursor used to evaluate the rearrangement condition.
// Ex:
//  k = 1
//     s,e,b  c
//         |  |
//         5->4->3->2->1
//
//  k = 5
//  null
//  s    e,b  c
//         |  |
//         5->4->3->2->1
//
//  k = 10
//  null
//  s,e    b  c
//         |  |
//         5->4->3->2->1
//
// Rearrangement:
//  Because the linked list is singly-linked, the only insert
//  available is insertAfter, where a node is used as a reference
//  after which to insert. Each cursor represents this reference.
//  The rearrangement condition is c.value [<=>] k.
//  If the node in cursor c is smaller than k, it must be inserted after
//  the s cursor. If the node is equal to k, it must be inserted after
//  the e cursor. If the node is bigger than k, it does not need to be
//  rearranged because it is already directly in front of the b cursor.
//
//  The cursors decide how to move based on the rearrangement condition
//  and their current state. For instance, if all the cursors are on the
//  same node, and the c node is less than k, all cursors simply move to c.
//  If there is some separation between s and b or e and b, and the
//  rearrangement condition calls for an insertion after s or e, the insertion
//  is performed and s and or e is moved to that new position accordingly.
//  If a node is moved behind b, b doesn't have to change.
//
// Ex:
//  k = 3
//  null
//  s,e    b  c
//         |  |
//         5->4->3->2->1
//
//  s,e       b  c
//            |  |
//         5->4->3->2->1
//
//  s      e     b  c
//         |     |  |
//         3->5->4->2->1
//
//         s  e     b  c
//         |  |     |  |
//         2->3->5->4->1
//
//  c         s  e     b
//            |  |     |
//         2->1->3->5->4
//
// Ex:
//  k = 1
//     s,e,b  c
//         |  |
//         0->0->0->0
//
//        s,e,b  c
//            |  |
//         0->0->0->0
//
//           s,e,b  c
//               |  |
//         0->0->0->0
//  null
//  c           s,e,b
//                  |
//         0->0->0->0

export const rearrangeLinkedList = (head, k) => {
  let {c, s, e, b} = initializeCursors(head, k);
  while (c !== null) {
    if (c.value < k) {
      if (s !== b) {
        remove(c, b);
        head = insertAfter(c, s, head);
        if (e === s) {
          e = safeGetNext(e, head);
        }
        s = safeGetNext(s, head);
      } else {
        s = e = b = b.next;
      }
    } else if (c.value === k) {
      if (e !== b) {
        remove(c, b);
        head = insertAfter(c, e, head);
        e = safeGetNext(e, head);
      } else {
        e = b = b.next;
      }
    } else {
      b = b.next;
    }
    c = b.next;
  }
  return head;
};
