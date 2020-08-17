import { rotateImage, inPlaceRotateImage } from './1.7-rotate-matrix';

describe('rotateImage and inPlaceRotateImage', () => {

  test.each([null, undefined, 123, 'twenty-five', {}, () => true])('throws if image is not an array', (image) => {
    expect(() => rotateImage(image)).toThrow('image is not an array');
    expect(() => inPlaceRotateImage(image)).toThrow('image is not an array');
  });

  test('returns image if image is empty', () => {
    expect(rotateImage([])).toStrictEqual([]);
    expect(inPlaceRotateImage([])).toStrictEqual([]);
  });

  test('throws if image is not a square matrix', () => {
    expect(() => rotateImage([[1,2],[3,4],[5,6]])).toThrow('image is not a square matrix');
    expect(() => inPlaceRotateImage([[1,2],[3,4],[5,6]])).toThrow('image is not a square matrix');
  });

  test('returns image if image is 1x1', () => {
    const image = [[25]];
    expect(rotateImage(image)).toStrictEqual(image);
    expect(inPlaceRotateImage(image)).toStrictEqual(image);
  });

  test('rotates a 2x2 matrix', () => {
    const image = [
      [1, 2],
      [3, 4],
    ];
    const rotatedImage = [
      [3, 1],
      [4, 2],
    ];
    expect(rotateImage(image)).toStrictEqual(rotatedImage);
    expect(inPlaceRotateImage(image)).toStrictEqual(rotatedImage);
  });

  test('rotates a 5x5 matrix', () => {
    const image = [
      [ 1,  2,  3,  4,  5],
      [ 6,  7,  8,  9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    const rotatedImage = [
      [21, 16, 11,  6,  1],
      [22, 17, 12,  7,  2],
      [23, 18, 13,  8,  3],
      [24, 19, 14,  9,  4],
      [25, 20, 15, 10,  5],
    ];
    expect(rotateImage(image)).toStrictEqual(rotatedImage);
    expect(inPlaceRotateImage(image)).toStrictEqual(rotatedImage);
  });

});
