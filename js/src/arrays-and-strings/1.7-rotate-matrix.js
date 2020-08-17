// Given an image represented by an
// NxN matrix, where each pixel in
// the image is 4 bytes, write a method
// to rotate the image by 90 degrees.
// Can you do this in place?

const createEmptySquareMatrix = (length) => {
  const squareMatrix = [];
  for (let i = 0; i < length; i++) {
    squareMatrix[i] = [];
  }
  return squareMatrix;
};

export const rotateImage = (image) => {
  if (!Array.isArray(image)) {
    throw 'image is not an array';
  }
  const length = image.length;
  if (length === 0) {
    return image;
  }
  if (length !== image[0].length) {
    throw 'image is not a square matrix';
  }
  if (length === 1) {
    return image;
  }
  const rotatedImage = createEmptySquareMatrix(length);
  for (let i = 0; i < length; i++) {
    const rotatedJ = length - 1 - i;
    for (let j = 0; j < length; j++) {
      rotatedImage[j][rotatedJ] = image[i][j];
    }
  }
  return rotatedImage;
};

export const inPlaceRotateImage = (image) => {
  if (!Array.isArray(image)) {
    throw 'image is not an array';
  }
  const length = image.length;
  if (length === 0) {
    return image;
  }
  if (length !== image[0].length) {
    throw 'image is not a square matrix';
  }
  if (length === 1) {
    return image;
  }
  // First, flip across the left->right, bottom->top diagonal
  for (let i = 0, k = length; i < length; k--, i++) {
    for (let j = 0; j < k; j++) {
      const temp = image[i][j];
      const rotatedI = length - j - 1;
      const rotatedJ = length - i - 1;
      image[i][j] = image[rotatedI][rotatedJ];
      image[rotatedI][rotatedJ] = temp;
    }
  }
  // Second, flip across horizontal
  for (let i = 0; i < Math.floor(length / 2); i++) {
    for (let j = 0; j < length; j++) {
      const rotatedI = length - i - 1;
      const temp = image[i][j];
      image[i][j] = image[rotatedI][j];
      image[rotatedI][j] = temp;
    }
  }
  return image;
};
