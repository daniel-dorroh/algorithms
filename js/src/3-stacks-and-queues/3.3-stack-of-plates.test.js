import { StackOfPlates } from './3.3-stack-of-plates';

describe('StackOfPlates', () => {

  let stack = null;
  const stackDepth = 5;
  beforeEach(() => stack = new StackOfPlates(stackDepth));

  describe('constructor', () => {

    test('makes a new StackOfPlates with a given maxDepth', () => {
      const stack = new StackOfPlates(10);
      expect(stack).toBeDefined();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.isFull()).toBe(false);
    });

  });

  describe('isEmpty', () => {

    test('true if stack is empty', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    test('false even if current top stack is empty', () => {
      for (let i = 0; i < stackDepth + 1; i++) {
        stack.push(i * 5);
      }
      stack.pop();
      expect(stack.getTopStack_().isEmpty()).toBe(true);
      expect(stack.isEmpty()).toBe(false);
    });

  });

  describe('push', () => {

    test('creates another top stack when top stack is full', () => {
      for (let i = 0; i < stackDepth; i++) {
        stack.push(i * 5);
      }
      expect(stack.isFull()).toBe(true);
      expect(stack.topStackId_).toBe(0);
      stack.push(35);
      expect(stack.isFull()).toBe(false);
      expect(stack.topStackId_).toBe(1);
    });

  });

  describe('pop', () => {

    test('returns null when stack is empty and does not pop bottom stack', () => {
      expect(stack.pop()).toBeNull();
      expect(stack.getTopStack_()).toBeDefined();
    });

    test('pops old top stack when top stack is empty', () => {
      for (let i = 0; i < stackDepth + 1; i++) {
        stack.push(i * 5);
      }
      stack.pop();
      expect(stack.topStackId_).toBe(1);
      expect(stack.getTopStack_().isEmpty()).toBe(true);
      stack.pop();
      expect(stack.topStackId_).toBe(0);
      stack.push(25);
      expect(stack.isFull()).toBe(true);
    });

    test('returns top value', () => {
      stack.push(25);
      expect(stack.pop()).toBe(25);
    });

  });

  describe('peek', () => {

    test('returns null if stack is empty', () => {
      expect(stack.peek()).toBeNull();
    });

    test('returns top value and does not pop it', () => {
      stack.push(25);
      expect(stack.peek()).toBe(25);
      expect(stack.pop()).toBe(25);
    });

  });

});
