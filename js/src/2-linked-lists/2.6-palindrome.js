import { throwIfNotList } from '../utility/arg-checking';

// Implement a function to check if a linked list is a palindrome.

const isOdd = (input) => (input % 2) !== 0;

export const isPalindrome = (list) => {
  throwIfNotList(list);
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
