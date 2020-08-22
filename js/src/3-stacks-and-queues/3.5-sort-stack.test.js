import { sortStack } from './3.5-sort-stack';
import { Stack } from '@dinosanjo/data-structures';

describe('sortStack', () => {

  test('throws if stack does not meet interface requirements', () => {
    expect(() => sortStack({})).toThrow('stack is not a supported stack');
  });

  test('does nothing to stack if it is empty', () => {
    const stack = new Stack();
    sortStack(stack);
    expect(stack).toStrictEqual(stack);
  });

  test('does nothing to single item stack', () => {
    const stack = new Stack();
    stack.push(25);
    sortStack(stack);
    expect(stack).toStrictEqual(stack);
  });

  test('sorts stack so the minimum value is on top', () => {
    const stack = new Stack();
    const values = [0, 3, 2, 1, 9, 2, 6, 3, 1, 5];
    const sortedValues = [...values].sort();
    for (const value of values) {
      stack.push(value);
    }
    sortStack(stack);
    for (const value of sortedValues) {
      expect(stack.pop()).toBe(value);
    }
  });

});
