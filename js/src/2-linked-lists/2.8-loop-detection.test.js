import { SingleList } from '@dinosanjo/data-structures';
import { findBeginningOfLoop } from './2.8-loop-detection';

describe('findBeginningOfLoop', () => {

  test.each([123, "25", {}, () => true])('throws if list is not a SingleList', (list) => {
    expect(() => findBeginningOfLoop(list)).toThrow();
  });

  test('returns null for empty list', () => {
    expect(findBeginningOfLoop(new SingleList())).toBeNull();
  });

  test('returns null if no loops are found', () => {
    const list = new SingleList();
    for (let i = 0; i < 5; i++) {
      list.pushBack(Math.random() * 100);
    }
    expect(findBeginningOfLoop(list)).toBeNull();
  });

  test('returns node representing the beginning of the loop', () => {
    const list = new SingleList();
    for (let i = 0; i < 5; i++) {
      list.pushBack(Math.random() * 100);
    }
    const loopNodeId = list.pushBack(25);
    const loopNode = list.get(loopNodeId);
    for (let i = 0; i < 10; i++) {
      list.pushBack(Math.random() * 100);
    }
    const lastNode = list.get(list.backId_);
    lastNode.next = loopNodeId;
    expect(findBeginningOfLoop(list)).toBe(loopNode);
  });

});
