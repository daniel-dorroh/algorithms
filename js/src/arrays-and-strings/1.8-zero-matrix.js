import { throwIfNotArray } from '../utility/arg-checking';

// Write an algorithm such that if
// an element in an MxN matrix is 0,
// its entire row and column are set to 0;

export const bombermanTheMatrix = (input) => {
  throwIfNotArray(input);
  const length = input.length;
  if (length === 0) {
    return input;
  }
  const width = input[0].length;
  if (width === 0) {
    return input;
  }
  const zeroedRows = [];
  const zeroedColumns = [];
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
      if (input[i][j] === 0) {
        zeroedRows[i] = true;
        zeroedColumns[j] = true;
      }
    }
  }
  for (let i = 0; i < zeroedRows.length; i++) {
    if (zeroedRows[i] === undefined) {
      continue;
    }
    for (let j = 0; j < width; j++) {
      input[i][j] = 0;
    }
  }
  for (let j = 0; j < zeroedColumns.length; j++) {
    if (zeroedColumns[j] === undefined) {
      continue;
    }
    for (let i = 0; i < length; i++) {
      input[i][j] = 0;
    }
  }
  return input;
};
