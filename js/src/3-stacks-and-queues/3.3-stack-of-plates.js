import { Stack } from '@dinosanjo/data-structures';

// Imagine a literal stack of plates. If the stack gets too high,
// it might topple. Therefore, in real life, we would likely start
// a new stack when the previous stack exceeds some threshold.
// Implement a data structure SetOfStacks that mimics this.
// SetOfStacks should be composed of several stacks and should create
// a new stack once the previous one exceeds capacity. SetOfStacks.push()
// and SetOfStacks.pop() should behave identically to a single stack,
// that is, pop() should return the same values as it would if there
// were just a single stack.

export class StackOfPlates {

  constructor(maxDepth) {
    this.stacks_ = [new Stack()];
    this.topStackId_ = 0;
    this.topStackDepth_ = 0;
    this.maxDepth_ = maxDepth;
  }

  isEmpty() {
    return this.stacks_.length === 1
        && this.topStackDepth_ === 0;
  }

  isFull() {
    return this.topStackDepth_ === this.maxDepth_;
  }

  push(value) {
    if (this.isFull()) {
      this.stacks_.push(new Stack());
      this.topStackDepth_ = 0;
      this.topStackId_++;
    }
    this.getTopStack_().push(value);
    this.topStackDepth_++;
  }

  pop() {
    if (this.topStackDepth_ === 0
        && this.topStackId_ !== 0) {
      this.stacks_.pop();
      this.topStackDepth_ = this.maxDepth_;
      this.topStackId_--;
    }
    if (this.isEmpty()) {
      return null;
    }
    const value = this.getTopStack_().pop();
    this.topStackDepth_--;
    return value;
  }

  peek() {
    return this.getTopStack_().peek();
  }

  getTopStack_() {
    return this.stacks_[this.topStackId_];
  }

}
