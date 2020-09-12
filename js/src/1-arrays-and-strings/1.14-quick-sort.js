
export const PartitionType = {
  HOARE: 'HOARE',
  LOMUTO: 'LOMUTO',
};

const swap = (items, i, j) => {
  const temp = items[i];
  items[i] = items[j];
  items[j] = temp;
};

const hoarePartition = (items, start, end) => {
  const pivot = items[Math.floor((start + end) / 2)];
  let i = start - 1;
  let j = end + 1;
  while (true) {
    i++;
    while (items[i] < pivot) {
      i++;
    }
    j--;
    while (items[j] > pivot) {
      j--;
    }
    if (i >= j) {
      return j;
    }
    swap(items, i, j);
  }
};

const lomutoPartition = (items, start, end) => {
  const pivot = items[end];
  let i = start;
  for (let j = start; j <= end; j++) {
    if (items[j] < pivot) {
      swap(items, i, j);
      i++;
    }
  }
  swap(items, i, end);
  return i;
};

const getMiddleIndex = (items, start, end, partitionType) => {
  if (partitionType === PartitionType.HOARE) {
    return hoarePartition(items, start, end);
  } else if (partitionType === PartitionType.LOMUTO) {
    return lomutoPartition(items, start, end);
  } else {
    throw `Unrecognized partitionType ${partitionType} specified`;
  }
};

export const quickSort = (items, start = 0, end = items.length - 1, partitionType = PartitionType.HOARE) => {
  if (start >= end) {
    return;
  }
  const middleIndex = getMiddleIndex(items, start, end, partitionType);
  let leftEnd = middleIndex;
  const rightStart = middleIndex + 1;
  if (partitionType === PartitionType.LOMUTO) {
    leftEnd--;
  }
  quickSort(items, start, leftEnd);
  quickSort(items, rightStart, end);
};
