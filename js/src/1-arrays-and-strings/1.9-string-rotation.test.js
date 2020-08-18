import { isRotation } from './1.9-string-rotation';

describe('isRotation', () => {

  const nonStringInputs = [123, {}, [], () => true];

  test.each(nonStringInputs)('throws if s1 is not a string', (input) => {
    expect(() => isRotation(input, 's2')).toThrow();
  });

  test.each(nonStringInputs)('throws if s2 is not a string', (input) => {
    expect(() => isRotation('s1', input)).toThrow();
  });

  test('false if s1 and s2 are different lengths', () => {
    expect(isRotation('25', '350')).toBe(false);
  });

  test('true if s1 and s2 are rotations of each other', () => {
    expect(isRotation('123456', '345612')).toBe(true);
  });

});
