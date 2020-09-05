
export class Node {

  constructor(value, parent = null) {
    this.value_ = value;
    this.children_ = [null, null];
    this.childCount_ = 0;
    this.parent_ = parent;
  }

  childCount() {
    return this.childCount_;
  }

  children() {
    return [this.left(), this.right()].filter(c => c !== null);
  }

  parent() {
    return this.parent_;
  }

  value() {
    return this.value_;
  }

  left() {
    return this.children_[0];
  }

  right() {
    return this.children_[1];
  }

  changeParent(parent) {
    if (parent !== null
        && parent !== undefined
        && parent !== this.parent()) {
      this.parent_ = parent;
    }
  }

  addLeft(value) {
    value.changeParent(this);
    this.children_[0] = value;
    this.childCount_++;
  }

  addRight(value) {
    value.changeParent(this);
    this.children_[1] = value;
    this.childCount_++;
  }

  deleteChild(child) {
    if (this.children_.includes(child)) {
      this.children_[this.children_.indexOf(child)] = null;
      child.changeParent(null);
      this.childCount_--;
    }
  }

}

export const throwIfNotNode = (node, name = 'node') => {
  if (!(node instanceof Node)) {
    throw `${name} is not a Node`;
  }
}
