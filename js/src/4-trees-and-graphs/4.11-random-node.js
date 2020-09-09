import { Node } from './node';
import { DenseRepository } from '@dinosanjo/data-structures/dist/utility/dense-repository';

// You are implementing a binary tree class from scratch,
// which, in addition to insert, find, and delete, has a
// method getRandomNode() which returns a random node from
// the tree. All nodes should be equally likely to be
// chosen. Design and implement an algorithm for getRandomNode,
// and explain how you would implement the rest of the methods.

const numericCompare = (x, y) => {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else {
    return 1;
  }
};

export class BinarySearchTree {

  constructor(root = null, values = []) {
    this.root_ = root;
    this.repository_ = new DenseRepository();
    if (values.length !== 0) {
      this.initialize_(values.sort(numericCompare));
    }
    const largeNumber = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
    this.randomSlope_ = Math.floor(Math.random() * largeNumber);
    this.randomOffset_ = Math.floor(Math.random() * largeNumber);
    this.randomIndex_ = 0;
  }

  insert(valueNode) {
    if (this.root_ === null) {
      this.root_ = valueNode;
    } else {
      this.insert_(this.root_, valueNode);
    }
    valueNode.id = this.repository_.add(valueNode);
    return valueNode;
  }

  insertValue(value) {
    const valueNode = new Node(value);
    return this.insert(valueNode);
  }

  getRandomNode() {
    const id = this.getNextRandom_();
    return this.repository_.get(id);
  }

  find(value, target = null) {
    if (target === null) {
      target = this.root_;
    }
    if (value === target.value()) {
      return target;
    } else if (value < target.value()) {
      return target.left() !== null
          ? this.find(value, target.left())
          : null;
    } else {
      return target.right() !== null
          ? this.find(value, target.right())
          : null;
    }
  }

  deleteFirst(value) {
    const valueNode = this.find(value);
    this.deleteNode_(valueNode);
    this.repository_.delete(valueNode.id);
  }

  delete(value) {
    let valueNode = this.find(value);
    while (valueNode !== null) {
      this.deleteNode_(valueNode);
      this.repository_.delete(valueNode.id);
      valueNode = this.find(value);
    }
  }

  getNextRandom_() {
    return (this.randomSlope_ * this.randomIndex_++ + this.randomOffset_) % this.repository_.size();
  }

  getMiddleIndex_(values) {
    return Math.floor(values.length / 2);
  }

  initialize_(values) {
    if (values.length === 0) {
      return null;
    }
    const middleIndex = this.getMiddleIndex_(values);
    const middleNode = new Node(values[middleIndex]);
    middleNode.id = this.repository_.add(middleNode);
    const left = this.initialize_(values.slice(0, middleIndex));
    const right = this.initialize_(values.slice(middleIndex + 1, values.length));
    if (left !== null) {
      middleNode.addLeft(left);
    }
    if (right !== null) {
      middleNode.addRight(right);
    }
    return middleNode;
  }

  insert_(parent, node) {
    if (parent.value() >= node.value()) {
      if (parent.right() === null) {
        parent.addRight(node);
      } else {
        this.insert_(parent.right(), node);
      }
    } else {
      if (parent.left() === null) {
        parent.addLeft(node);
      } else {
        this.insert_(parent.left(), node);
      }
    }
  }

  deleteNode_(node) {
    const parent = node.parent();
    parent.deleteChild(node);
    let replacement = node.right() !== null
        ? node.right()
        : node.left();
    if (replacement !== null) {
      replacement.changeParent(parent);
    }
    return replacement;
  }

}
