import { add } from './6.13-curried-adder';

describe('add', () => {

  test('adds two numbers together', () => {
    expect(add(2, 4)).toBe(6);
  });

  test('adds two numbers that are called one after another', () => {
    expect(add(2)(4)).toBe(6);
  });

  test('tolerates initial empty calls before a two-param call', () => {
    expect(add()()()(2, 4)).toBe(6);
  });

  test('tolerates interspersed empty called with single-param calls', () => {
    expect(add()()(2)()()()(4)).toBe(6);
  });

});
