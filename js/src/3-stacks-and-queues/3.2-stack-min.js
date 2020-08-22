import { Heap, HEAP_TYPES, Stack } from '@dinosanjo/data-structures';

// How would you design a stack which, in addition
// to push and pop, has a function min which returns
// the minimum element? Push, pop, and min should
// all operate in O(1) time.

export class MinStack extends Stack {

  constructor() {
    super();
    this.minValues_ = new Stack();
  }

  min() {
    return this.minValues_.peek();
  }

  push(value) {
    if (this.minValues_.isEmpty()
        || value <= this.minValues_.peek()) {
      this.minValues_.push(value);
    }
    super.push(value);
  }

  pop() {
    const value = super.pop();
    if (value === this.minValues_.peek()) {
      this.minValues_.pop();
    }
    return value;
  }

}
