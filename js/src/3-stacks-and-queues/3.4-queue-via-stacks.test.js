import { StacksQueue } from './3.4-queue-via-stacks';

describe('StacksQueue', () => {

  let queue = null;
  beforeEach(() => queue = new StacksQueue());

  describe('constructor', () => {

    test('creates a new StacksQueue', () => {
      const queue = new StacksQueue();
      expect(queue).toBeDefined();
      expect(queue.size()).toBe(0);
    });

  });

  describe('size', () => {

    test('size increases with enqueue', () => {
      expect(queue.size()).toBe(0);
      queue.enqueue(25);
      expect(queue.size()).toBe(1);
      queue.enqueue(25);
      expect(queue.size()).toBe(2);
    });

    test('size decreases with dequeue', () => {
      queue.enqueue(25);
      queue.enqueue(25);
      expect(queue.size()).toBe(2);
      queue.dequeue();
      expect(queue.size()).toBe(1);
      queue.dequeue();
      expect(queue.size()).toBe(0);
    });

  });

  describe('enqueue', () => {

    test('a single item ends up in current reading queue', () => {
      queue.enqueue(25);
      expect(queue.reading_.peek()).toBe(25);
      expect(queue.writing_.peek()).toBeNull();
    });

    test('items after first end up in writing queue', () => {
      queue.enqueue(25);
      queue.enqueue(35);
      queue.enqueue(45);
      expect(queue.reading_.peek()).toBe(25);
      expect(queue.writing_.pop()).toBe(45);
      expect(queue.writing_.pop()).toBe(35);
    });

  });

  describe('dequeue', () => {

    test('returns null for empty queue', () => {
      expect(queue.dequeue()).toBeNull();
    });

    test('results in disordered items on writing stack put on reading stack when reading emptied', () => {
      queue.enqueue(25);
      queue.enqueue(35);
      queue.enqueue(45);
      expect(queue.reading_.items_).toHaveLength(1);
      expect(queue.dequeue()).toBe(25);
      expect(queue.reading_.items_).toHaveLength(2);
      expect(queue.writing_.items_).toHaveLength(0);
      queue.enqueue(55);
      expect(queue.reading_.items_).toHaveLength(2);
      expect(queue.writing_.items_).toHaveLength(1);
      expect(queue.dequeue()).toBe(35);
      expect(queue.dequeue()).toBe(45);
      expect(queue.reading_.items_).toHaveLength(1);
      expect(queue.writing_.items_).toHaveLength(0);
    });

  });

});
