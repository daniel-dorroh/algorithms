import { SingleList } from '@dinosanjo/data-structures';
import { throwIfNotList } from '../utility/arg-checking';

// You have two numbers represented by
// a linked list, where each node contains
// a single digit. The digits are stored
// in reverse order, such that the 1's
// digit is at the head of the list. Write
// a function that adds the two numbers
// and returns the sum as a linked list.
// Repeat the problem supposing the digits
// are stored in forward order.

export const sum = (x, y) => {
  throwIfNotList(x, 'x');
  throwIfNotList(y, 'y');
  const xIterator = x.getIterator();
  const yIterator = y.getIterator();
  let carry = 0;
  const sumList = new SingleList();
  while (true) {
    const {done: xDone, value: xItem} = xIterator.next();
    const {done: yDone, value: yItem} = yIterator.next();
    if (xDone && yDone) {
      break;
    }
    let digitSum = carry;
    digitSum += !xDone ? xItem.value : 0;
    digitSum += !yDone ? yItem.value : 0;
    const onesValue = digitSum - 10;
    const mustCarry = onesValue >= 0;
    sumList.pushBack(mustCarry ? onesValue : digitSum);
    carry = mustCarry ? 1 : 0;
  }
  if (carry > 0) {
    sumList.pushBack(carry);
  }
  return sumList;
};

const padFront = (x, padCount) => {
  for (let i = 0; i < padCount; i++) {
    x.pushFront(0);
  }
}

const padShorter = (x, y) => {
  const diff = Math.abs(x.size() - y.size());
  if (diff === 0) {
    return;
  }
  if (x.size() < y.size()) {
    padFront(x, diff);
  } else {
    padFront(y, diff);
  }
}

export const reverseSum = (x, y) => {
  throwIfNotList(x, 'x');
  throwIfNotList(y, 'y');
  padShorter(x, y);
  const xIterator = x.getIterator();
  const yIterator = y.getIterator();
  const digitSums = [];
  const sumList = new SingleList();
  while (true) {
    const {done: xDone, value: xItem} = xIterator.next();
    const {done: yDone, value: yItem} = yIterator.next();
    if (xDone && yDone) {
      break;
    }
    digitSums.push(xItem.value + yItem.value);
  }
  let carry = 0;
  for (let i = digitSums.length - 1; i >= 0; i--) {
    const digitSum = digitSums[i] + carry;
    const onesValue = digitSum - 10;
    const mustCarry = onesValue >= 0;
    sumList.pushFront(mustCarry ? onesValue : digitSum);
    carry = mustCarry ? 1 : 0;
  }
  if (carry > 0) {
    sumList.pushFront(carry);
  }
  return sumList;
};
