import { Heap, HEAP_TYPES, Stack } from '@dinosanjo/data-structures';

// How would you design a stack which, in addition
// to push and pop, has a function min which returns
// the minimum element? Push, pop, and min should
// all operate in O(1) time.

export class MinStack extends Stack {

  constructor() {
    super();
    this.minValues_ = new Heap(HEAP_TYPES.MINIMUM);
    this.valuesCache_ = new Map();
  }

  min() {
    while (true) {
      const min = this.minValues_.peek();
      if (min === undefined || this.valueExists_(min)) {
        return min;
      }
      this.minValues_.pop();
    }
  }

  push(value) {
    this.minValues_.push(value);
    this.cache_(value);
    super.push(value);
  }

  pop() {
    const value = super.pop();
    this.decache_(value);
    return value;
  }

  cache_(value) {
    let cache = this.valuesCache_[value];
    if (cache === undefined) {
      cache = [value];
    } else {
      cache.push(value);
    }
    this.valuesCache_[value] = cache;
  }

  decache_(value) {
    const cache = this.valuesCache_[value];
    cache.pop();
    if (cache.length === 0) {
      this.valuesCache_[value] = undefined;
    }
  }

  valueExists_(value) {
    return this.valuesCache_[value] !== undefined;
  }

}
