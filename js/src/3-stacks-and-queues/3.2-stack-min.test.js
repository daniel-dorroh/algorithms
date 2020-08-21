import { MinStack } from './3.2-stack-min';

describe('push', () => {

  test('caches value and adds to min heap', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.valuesCache_[value]).toBeDefined();
    expect(stack.valuesCache_[value][0]).toBe(value);
    expect(stack.minValues_.peek()).toBe(value);
  });

  test('caches two of the same value correctly', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    stack.push(value);
    expect(stack.valuesCache_[25]).toHaveLength(2);
  });

});

describe('pop', () => {

  test('removes value from cache but leaves it in min heap', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.pop()).toBe(value);
    expect(stack.minValues_.peek()).toBe(value);
    expect(stack.valuesCache_[value]).toBeUndefined();
  });

});

describe('min', () => {

  test('returns null if stack empty', () => {
    expect(new MinStack().min()).toBeUndefined();
  });

  test('returns the only value', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.min()).toBe(value);
  });

  test('returns new min after old min has been popped off (not constant run time)', () => {
    const stack = new MinStack();
    stack.push(35);
    stack.push(5);
    stack.push(15);
    stack.push(0);
    expect(stack.min()).toBe(0);
    stack.pop();
    expect(stack.minValues_.peek()).toBe(0);
    expect(stack.min()).toBe(5);
  });

});
