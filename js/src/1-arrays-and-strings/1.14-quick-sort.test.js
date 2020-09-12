import { quickSort, PartitionType } from './1.14-quick-sort';

describe('quickSort', () => {

  test('sorts array using default partition (HOARE)', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12, 13];
    quickSort(input);
    expect(input).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12, 13]);
  });

  test('sorts array with repeats', () => {
    const input = [2, 2, 1, 1, 2, 1];
    quickSort(input);
    expect(input).toStrictEqual([1, 1, 1, 2, 2, 2]);
  });

  test('sorts array using LOMUTO partition', () => {
    const input = [5, 3, 4, 6, 2, 9, 1, 0, 12, 13];
    quickSort(input, 0, input.length - 1, PartitionType.LOMUTO);
    expect(input).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 9, 12, 13]);
  });

  test('throws for unknown partition type', () => {
    const partitionType = 'DORROH';
    const input = [3, 1, 2];
    expect(() => quickSort(input, 0, input.length - 1, partitionType))
        .toThrow(`Unrecognized partitionType ${partitionType} specified`);
  });

});
