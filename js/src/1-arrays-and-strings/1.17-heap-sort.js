
const getLeft = (i) => 2 * i + 1;
const getRight = (i) => 2 * i + 2;
const getParent = (i) => Math.floor((i - 1) / 2);

const swap = (items, i, j) => {
  [items[i], items[j]] = [items[j], items[i]];
};

const siftDown = (items, start, end) => {
  let root = start;
  while (getLeft(root) <= end) {
    const left = getLeft(root);
    let toSwap = root;
    if (items[toSwap] < items[left]) {
      toSwap = left;
    }
    const right = getRight(root);
    if (right <= end && items[toSwap] < items[right]) {
      toSwap = right;
    }
    if (toSwap === root) {
      return;
    } else {
      swap(items, root, toSwap);
      root = toSwap;
    }
  }
};

const buildMaxHeap = (items) => {
  let start = getParent(items.length - 1);
  while (start >= 0) {
    siftDown(items, start, items.length - 1);
    start--;
  }
};

export const heapSort = (items) => {
  buildMaxHeap(items);
  let end = items.length - 1;
  while (end > 0) {
    swap(items, end, 0);
    end--;
    siftDown(items, 0, end);
  }
};
