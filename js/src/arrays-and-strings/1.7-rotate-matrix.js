// Given an image represented by an
// NxN matrix, where each pixel in
// the image is 4 bytes, write a method
// to rotate the image by 90 degrees.
// Can you do this in place?

export const rotateImage = (image) => {
  if (!Array.isArray(image)) {
    throw 'image is not an array';
  }
  if (image.length === 0) {
    return image;
  }
  if (image.length !== image[0].length) {
    throw 'image is not a square matrix';
  }
  if (image.length === 1) {
    return image;
  }
  const rotatedImage = [];
  for (let k = 0; k < image.length; k++) {
    rotatedImage[k] = [];
  }
  for (let i = 0; i < image.length; i++) {
    const rotatedJ = image.length - 1 - i;
    for (let j = 0; j < image.length; j++) {
      rotatedImage[j][rotatedJ] = image[i][j];
    }
  }
  return rotatedImage;
};
