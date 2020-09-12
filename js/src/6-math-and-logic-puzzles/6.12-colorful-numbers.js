import { throwIfNotInteger } from '../utility/arg-checking';

const getSequence = (input) => {
  const sequence = [];
  for (const digit of '' + input) {
    sequence.push(Number.parseInt(digit));
  }
  return sequence;
};

const colorful = 'Colorful';
const notColorful = 'Not Colorful';

/**
 * Manual Testing
 * Input 248
 * ->getSequence(248)
 *  sequence = []
 *   digit = '2', sequence = [2]
 *   digit = '4', sequence = [2, 4]
 *   digit = '8', sequence = [2, 4, 8]
 * <-[2, 4, 8]
 * sequence = [2, 4, 8], products = {}, maxSubsequenceLength = 2, sequence.length = 3
 *  i = 0, subsequenceLength = 1,
 *   product = 2, products = {2}, subsequenceLength = 2
 *   product = 8, products = {2, 8}, subsequenceLength = 3
 *  i = 1, subsequenceLength = 1,
 *   product = 4, products = {2, 4, 8}, subsequenceLength = 2
 *   product = 32, products = {2, 4, 8, 32}, subsequenceLength = 3
 *  i = 2, subsequenceLength = 1
 *   product = 8
 * <-'Not Colorful'
 */

export const isNumberColorful = (input) => {
  throwIfNotInteger(input);
  const sequence = getSequence(input);
  const products = new Map();
  const maxSubsequenceLength = sequence.length - 1;
  for (let i = 0; i < sequence.length; i++) {
    let subsequenceLength = 1;
    while (subsequenceLength <= maxSubsequenceLength
        && i + subsequenceLength <= sequence.length) {
      const product = sequence
          .slice(i, i + subsequenceLength)
          .reduce((a, c) => c * a);
      if (products.get(product) !== undefined) {
        return notColorful;
      }
      products.set(product, true);
      subsequenceLength++;
    }
  }
  return colorful;
};
