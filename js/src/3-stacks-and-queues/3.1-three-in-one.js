import {} from '../utility/arg-checking';

// Describe how you could use a single
// array to implement three stacks

export class AddressedStack {

  constructor(depth, stackCount) {
    if (depth <= 0) {
      throw `depth '${depth}' is invalid`;
    }
    if (stackCount <= 0) {
      throw `stackCount '${stackCount}' is invalid`;
    }
    this.depth_ = depth;
    this.storage_ = [];
    let stackTopIds = {}
    this.bottomIds_ = {};
    for (let i = 0, stackTopId = 0;
        i < stackCount;
        i++, stackTopId += depth) {
      stackTopIds[i] = stackTopId;
      this.bottomIds_[i] = stackTopId;
    }
    this.stackCount_ = stackCount;
    this.topIds_ = stackTopIds;
  }

  isEmpty(stackId) {
    this.throwIfInvalidStackId_(stackId);
    const topId = this.topIds_[stackId];
    return this.bottomIds_[stackId] === topId
        && this.storage_[topId] === undefined;
  }

  push(stackId, value) {
    this.throwIfInvalidStackId_(stackId);
    this.throwIfStackFull_(stackId);
    if (value === null || value === undefined) {
      throw `value is ${value}`;
    }
    const topId = ++this.topIds_[stackId];
    this.storage_[topId] = value;
  }

  pop(stackId) {
    this.throwIfInvalidStackId_(stackId);
    if (this.isEmpty(stackId)) {
      return null;
    }
    const topId = this.topIds_[stackId];
    const value = this.storage_[topId];
    this.storage_[topId] = undefined;
    this.topIds_[stackId]--;
    return value;
  }

  peek(stackId) {
    this.throwIfInvalidStackId_(stackId);
    if (this.isEmpty(stackId)) {
      return null;
    }
    const topId = this.topIds_[stackId];
    const value = this.storage_[topId];
    return value;
  }

  isStackFull_(stackId) {
    return this.topIds_[stackId] === this.bottomIds_[stackId] + this.depth_;
  }

  throwIfInvalidStackId_(stackId) {
    if (stackId < 0 || stackId >= this.stackCount_) {
      throw `stackId '${stackId}' is invalid`;
    }
  }

  throwIfStackFull_(stackId) {
    if (this.isStackFull_(stackId)) {
      throw `stack '${stackId}' is full`;
    }
  }

}
