import { Stack } from '@dinosanjo/data-structures';

// Implement a MyQueue class which implements a queue using two stacks.

class RWStack extends Stack {

  constructor(isReading = true) {
    super();
    this.isReading_ = isReading;
    this.disorder_ = 0;
  }

  disorder() {
    return this.disorder_;
  }

  push(value) {
    super.push(value);
    if (!this.isReading_) {
      this.disorder_++;
    }
  }

  pop() {
    const value = super.pop();
    if (!this.isReading_) {
      this.disorder_--;
    }
    return value;
  }

}

export class StacksQueue {

  constructor() {
    this.reading_ = new RWStack(true);
    this.writing_ = new RWStack(false);
    this.size_ = 0;
  }

  size() {
    return this.size_;
  }

  isEmpty() {
    return this.size_ === 0;
  }

  enqueue(value) {
    this.writing_.push(value);
    if (this.reading_.isEmpty()) {
      this.equilibrate_();
    }
    this.size_++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.reading_.pop();
    if (this.reading_.isEmpty()) {
      this.equilibrate_();
    }
    this.size_--;
    return value;
  }

  equilibrate_() {
    const disorder = this.writing_.disorder();
    for (let i = 0; i < disorder; i++) {
      const value = this.writing_.pop();
      this.reading_.push(value);
    }
  }

}
