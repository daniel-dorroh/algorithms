import { MinStack } from './3.2-stack-min';

describe('push', () => {

  test('adds value and adds to min stack', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.minValues_.peek()).toBe(value);
  });

  test('adds two of the same value to the min stack', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    stack.push(value);
    expect(stack.minValues_.items_).toHaveLength(2);
  });

});

describe('pop', () => {

  test('removes value from min stack', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.pop()).toBe(value);
    expect(stack.minValues_.peek()).toBeNull();
  });

});

describe('min', () => {

  test('returns null if stack empty', () => {
    expect(new MinStack().min()).toBeNull();
  });

  test('returns the only value', () => {
    const value = 25;
    const stack = new MinStack();
    stack.push(value);
    expect(stack.min()).toBe(value);
  });

  test('returns new min after old min has been popped off', () => {
    const stack = new MinStack();
    stack.push(35);
    stack.push(5);
    stack.push(15);
    stack.push(0);
    expect(stack.min()).toBe(0);
    stack.pop();
    expect(stack.min()).toBe(5);
  });

});
