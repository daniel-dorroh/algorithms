import { SingleList } from '@dinosanjo/data-structures';

// Implement a function to check if a linked list is a palindrome.

const isOdd = (input) => (input % 2) !== 0;

export const isPalindrome = (list) => {
  if (!(list instanceof SingleList)) {
    throw 'list is not a SingleList';
  }
  const incidenceInfo = {};
  let oddIncidenceCount = 0;
  for (const {value} of list) {
    if (incidenceInfo[value] === undefined) {
      incidenceInfo[value] = 1;
      oddIncidenceCount++;
    } else {
      incidenceInfo[value]++;
      if (isOdd(incidenceInfo[value])) {
        oddIncidenceCount++;
      } else {
        oddIncidenceCount--;
      }
    }
  }
  return oddIncidenceCount <= 1;
};
