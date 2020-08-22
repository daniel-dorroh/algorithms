import { Stack } from '@dinosanjo/data-structures';

// Write a program to sort a stack such that the smallest
// items are on the top. You can use an additional temporary
// stack, but you may not copy the elements into any other
// data structure. The stack supports the following operations:
// push, pop, peek, and isEmpty.

const throwIfUnsupportedStack = (stack) => {
  if (typeof stack.push !== 'function'
      || typeof stack.pop !== 'function'
      || typeof stack.peek !== 'function'
      || typeof stack.isEmpty !== 'function') {
    throw 'stack is not a supported stack';
  }
};

export const sortStack = (stack) => {
  throwIfUnsupportedStack(stack);
  if (stack.isEmpty()) {
    return;
  }
  const reverseStack = new Stack();
  let max = null;
  let current = null;
  while (!stack.isEmpty()) {
    current = stack.pop();
    if (max === null) {
      max = current;
      continue;
    }
    if (max < current) {
      const temp = current;
      current = max;
      max = temp;
    }
    while (reverseStack.peek() > current) {
      stack.push(reverseStack.pop());
    }
    reverseStack.push(current);
  }
  stack.push(max);
  while (!reverseStack.isEmpty()) {
    stack.push(reverseStack.pop());
  }
};
