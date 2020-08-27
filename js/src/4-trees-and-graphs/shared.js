
export class Node {

  constructor(value) {
    this.value_ = value;
    this.children_ = [];
  }

  value() {
    return this.value_;
  }

  left() {
    return this.children_[0] !== undefined ? this.children_[0] : null;
  }

  right() {
    return this.children_[1] !== undefined ? this.children_[1] : null;
  }

  addLeft(value) {
    this.children_[0] = value;
  }

  addRight(value) {
    this.children_[1] = value;
  }

}

export const throwIfNotNode = (node, name = 'node') => {
  if (!(node instanceof Node)) {
    throw `${name} is not a Node`;
  }
}
