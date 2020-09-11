
// Implement the Look and Say sequence
//
// Ex
//  1
//  11
//  21
//  1211
//  111221
//  312211
//  13112221
//  1113213211
//  31131211131221
//  13211311123113112211

const getNext = (value) => {
  const nextValue = [];
  let lastSeenChar = null;
  for (const char of value) {
    if (char === lastSeenChar) {
      nextValue[nextValue.length - 2]++;
    } else {
      nextValue.push(1);
      nextValue.push(char);
    }
    lastSeenChar = char;
  }
  return nextValue.join('');
};

/**
 * Manual debugging
 * 0
 * value = '1', sequence = []
 * <- []
 *
 * 1
 * value = '1', sequence = []
 * sequence = ['1'], value = '11'
 * <- ['1']
 *
 * 2
 * sequence = ['1'], value = '11', count = 1
 * sequence = ['1', '11'], value = '21', count = 0
 * <- ['1', '11']
 *
 * 3
 * sequence = ['1'], value = '11', count = 2
 * sequence = ['1', '11'], value = '21', count = 1
 * sequence = ['1', '11', '21'], value = '1211', count = 0
 * <- ['1', '11', '21']
 *
 */
export const generateLookAndSay = (count) => {
  let value = '1';
  const sequence = [];
  while (count > 0) {
    sequence.push(value);
    value = getNext(value);
    count--;
  }
  return sequence;
};
