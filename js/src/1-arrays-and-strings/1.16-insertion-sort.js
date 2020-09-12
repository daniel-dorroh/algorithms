
const swap = (items, i, j) => {
  const temp = items[i];
  items[i] = items[j];
  items[j] = temp;
};

/**
 * Manual test
 * Input = [3, 1, 2]
 * i = 1
 * 1 < 3 ? yep
 *  j = 1
 *  1 > 0 ? yep, 3 > 1 ? yep
 *   ->swap([3, 1, 2])
 *   <-
 *   items = [1, 3, 2]
 *   j = 0
 *  0 > 0 ? nop,
 * i = 2
 * 2 < 3 ? yep
 *  j = 2
 *  2 > 0 ? yep, 3 > 2 ? yep
 *   ->swap([1, 3, 2])
 *   <-
 *   items = [1, 2, 3]
 *   j = 1
 *  1 > 0 ? yep, 1 > 2 ? nop
 * i = 3
 * 3 < 3 ? nop
 * <-
 */

export const insertionSort = (items) => {
  for (let i = 1; i < items.length; i++) {
    let j = i;
    while (j > 0 && items[j - 1] > items[j]) {
      swap(items, j, j - 1);
      j--;
    }
  }
};
