import { AddressedStack } from './3.1-three-in-one';

describe('constructor', () => {

  test('throws if depth is invalid', () => {
    expect(() => new AddressedStack(-1, 10)).toThrow();
  });

  test('throws if stackCount is invalid', () => {
    expect(() => new AddressedStack(100, -1)).toThrow();
  });

  test('makes a new AddressedStack', () => {
    expect(new AddressedStack()).toBeDefined();
  });

});

describe('stack operations', () => {

  let stack = null;

  beforeEach(() => {
    stack = new AddressedStack(5, 3);
  });

  describe('isEmpty', () => {

    test.each([-1, 3])('throws if stackId invalid', (stackId) => {
      expect(() => stack.isEmpty(stackId)).toThrow(`stackId '${stackId}' is invalid`);
    });

    test('true for empty stacks false for populated stacks', () => {
      expect(stack.isEmpty(0)).toBe(true);
      expect(stack.isEmpty(1)).toBe(true);
      expect(stack.isEmpty(2)).toBe(true);
      stack.push(0, 25);
      expect(stack.isEmpty(0)).toBe(false);
      expect(stack.isEmpty(1)).toBe(true);
      expect(stack.isEmpty(2)).toBe(true);
      stack.push(1, 25);
      expect(stack.isEmpty(0)).toBe(false);
      expect(stack.isEmpty(1)).toBe(false);
      expect(stack.isEmpty(2)).toBe(true);
      stack.push(2, 25);
      expect(stack.isEmpty(0)).toBe(false);
      expect(stack.isEmpty(1)).toBe(false);
      expect(stack.isEmpty(2)).toBe(false);
    });

  });

  describe('push', () => {

    test.each([-1, 3])('throws if stackId invalid', (stackId) => {
      expect(() => stack.push(stackId, 25)).toThrow(`stackId '${stackId}' is invalid`);
    });

    test('throws if stack full', () => {
      for (let i = 0; i < 5; i++) {
        stack.push(0, i);
      }
      expect(() => stack.push(0, 25)).toThrow(`stack '0' is full`);
    });

    test.each([null, undefined])('throws if value is %s', (value) => {
      expect(() => stack.push(0, value)).toThrow(`value is ${value}`);
    });

    test('pushes to correct stack', () => {
      const value = 25;
      stack.push(1, value);
      expect(stack.pop(0)).toBeNull();
      expect(stack.pop(1)).toBe(value);
      expect(stack.pop(2)).toBeNull();
    });

  });

  describe('pop', () => {

    test.each([-1, 3])('throws if stackId invalid', (stackId) => {
      expect(() => stack.pop(stackId)).toThrow(`stackId '${stackId}' is invalid`);
    });

    test('returns null if stack is empty', () => {
      expect(stack.pop(0)).toBeNull();
    });

    test('stack is empty after only item is popped', () => {
      stack.push(2, 25);
      stack.pop(2);
      expect(stack.isEmpty(2)).toBe(true);
    });

  });

  describe('peek', () => {

    test.each([-1, 3])('throws if stackId invalid', (stackId) => {
      expect(() => stack.peek(stackId)).toThrow(`stackId '${stackId}' is invalid`);
    });

    test('returns null if stack is empty', () => {
      expect(stack.peek(0)).toBeNull();
      expect(stack.peek(0)).toBeNull();
      expect(stack.peek(0)).toBeNull();
    });

    test('returns top value but does not pop it', () => {
      stack.push(0, 25);
      stack.push(1, 35);
      stack.push(2, 45);
      expect(stack.peek(0)).toBe(25);
      expect(stack.pop(0)).toBe(25);
      expect(stack.peek(1)).toBe(35);
      expect(stack.pop(1)).toBe(35);
      expect(stack.peek(2)).toBe(45);
      expect(stack.pop(2)).toBe(45);
    });

  });

});

