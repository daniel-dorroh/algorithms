import { Node } from './node';
import { DenseRepository } from '@dinosanjo/data-structures/dist/utility/dense-repository';
import { throwIfNullOrUndefined } from '../utility/arg-checking';

// You are implementing a binary tree class from scratch,
// which, in addition to insert, find, and delete, has a
// method getRandomNode() which returns a random node from
// the tree. All nodes should be equally likely to be
// chosen. Design and implement an algorithm for getRandomNode,
// and explain how you would implement the rest of the methods.

export const numericCompare = (x, y) => {
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
      this.root_ = this.initialize_(values.sort(numericCompare));
    }
    const largeNumber = Math.floor(Math.random() * (Math.pow(2, 32) - 1));
    this.randomSlope_ = Math.floor(Math.random() * largeNumber);
    this.randomOffset_ = Math.floor(Math.random() * largeNumber);
    this.randomIndex_ = 0;
  }

  root() {
    return this.root_;
  }

  getIterator(node) {
    if (node === undefined || node === null) {
      node = this.root();
    }
    const getNext = function * (current) {
      if (current !== null) {
        if (current.left() !== null) {
          yield * getNext(current.left());
        }
        yield current;
        if (current.right() !== null) {
          yield * getNext(current.right());
        }
      }
    };
    return getNext(node);
  };

  insert(valueNode) {
    throwIfNullOrUndefined(valueNode, 'valueNode');
    if (this.root_ === null) {
      this.root_ = valueNode;
    } else {
      this.insert_(this.root_, valueNode);
    }
    valueNode.id = this.repository_.add(valueNode);
    return valueNode;
  }

  insertValue(value) {
    throwIfNullOrUndefined(value, 'value');
    const valueNode = new Node(value);
    return this.insert(valueNode);
  }

  getRandomNode() {
    const id = this.getNextRandom_();
    return this.repository_.get(id);
  }

  find(value, target = undefined) {
    if (value === null || value === undefined) {
      return null;
    }
    if (target === undefined) {
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
    if (valueNode === null) {
      return;
    }
    this.deleteNode_(valueNode);
    this.repository_.remove(valueNode.id);
  }

  delete(value) {
    let valueNode = this.find(value);
    while (valueNode !== null) {
      this.deleteNode_(valueNode);
      this.repository_.remove(valueNode.id);
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
    if (node.value() >= parent.value()) {
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
    parent && parent.deleteChild(node);
    let replacementNode = null;
    const orphanNodes = [];
    if (node.right() !== null) {
      replacementNode = node.right();
      parent && parent.addRight(replacementNode);
      for (const leftNode of this.getIterator(node)) {
        if (leftNode === node) {
          break;
        }
        orphanNodes.push(leftNode);
        leftNode.parent().deleteChild(leftNode);
      }
    } else if (node.left() !== null) {
      replacementNode = node.left();
      parent && parent.addLeft(replacementNode);
    }
    if (parent === null) {
      this.root_ = replacementNode;
      replacementNode && replacementNode.changeParent(null);
    }
    while (orphanNodes.length !== 0) {
      this.insert(orphanNodes.pop());
    }
    return replacementNode;
  }

}
