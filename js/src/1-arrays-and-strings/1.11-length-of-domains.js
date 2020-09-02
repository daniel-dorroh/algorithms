import { throwIfNotArray } from '../utility/arg-checking';

// Given a list of labels, return a list of domain
// lengths, where a domain is defined as a contiguous
// group of labels containing only the labels within
// the group.
//
// Example 1
//  Input: ['a', 'b', 'c', 'd', 'a', 'f', 'g', 'f', 'g', 'g']
//  Output: [5, 5]
//
// Example 2
//  Input: ['a', 'b', 'c', 'd']
//  Output: [1, 1, 1, 1]


const findNext = (list, startIndex) => {
  const startLabel = list[startIndex];
  let labelsSinceStart = new Set([startLabel]);
  let nextIndex = startIndex;
  for (let i = startIndex + 1; i < list.length; i++) {
    if (list[i] === startLabel) {
      nextIndex = i;
      break;
    }
    labelsSinceStart.add(list[i]);
  }
  if (nextIndex === startIndex) {
    labelsSinceStart = new Set();
  }
  return {
    nextIndex,
    labelsSinceStart,
  };
};

export const findDomainLengths = (labels) => {
  throwIfNotArray(labels);
  const lengths = [];
  let startIndex = 0;
  while (startIndex < labels.length) {
    let {nextIndex, labelsSinceStart} = findNext(labels, startIndex);
    while (labelsSinceStart.has(labels[nextIndex + 1])) {
      nextIndex++;
    }
    lengths.push(nextIndex - startIndex + 1);
    startIndex = nextIndex + 1;
  }
  return lengths;
};
