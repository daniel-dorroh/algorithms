import { rearrangeLinkedList } from './17.27-rearrange-linked-list';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const makeLinkedList = (values) => {
  let last = null;
  let node = null;
  for (let i = values.length - 1; i >= 0; i--) {
    node = new Node(values[i]);
    if (last) {
      node.next = last;
    }
    last = node;
  }
  return node;
};

const linkedListToArray = (head) => {
  const array = [];
  let current = head;
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
};

describe('rearrangeLinkedList', () => {

  test.each([
        [[3, 0, 5, 2, 1, 4], 3, [0, 2, 1, 3, 5, 4]],
        [[3, 0, 2, 1, 4, 5], 4, [3, 0, 2, 1, 4, 5]],
        [[3, 0, 2, 1, 4, 5], 5, [3, 0, 2, 1, 4, 5]],
        [[0, 3, 2, 1, 4, 5], 0, [0, 3, 2, 1, 4, 5]],
        [[0, 3, 2, 1, 4, 5, 3, -1, -2, 3, 6, 7, 3, 2, -9000], -9000, [-9000, 0, 3, 2, 1, 4, 5, 3, -1, -2, 3, 6, 7, 3, 2]],
        [[0, 3, 2, 1, 4, 5, 3, -1, -2, 3, 6, 7, 3, 2, -9000], 2, [0, 1, -1, -2, -9000, 2, 2, 3, 4, 5, 3, 3, 6, 7, 3]],
        [[3, 0, 5, 6, 1, 4], 2, [0, 1, 3, 5, 6, 4]],
        [[3], 0, [3]],
        [[3], 3, [3]],
        [[3], 5, [3]],
      ])('rearranges linked lists according to specification', (input, k, output) => {
    const head = makeLinkedList(input);
    const result = rearrangeLinkedList(head, k);
    expect(linkedListToArray(result)).toStrictEqual(output);
  });

});
