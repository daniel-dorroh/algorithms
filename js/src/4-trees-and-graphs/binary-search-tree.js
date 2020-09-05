import { Node, throwIfNotNode } from './node';
import { throwIfNotType } from '../utility/arg-checking';

export const throwIfNotBinarySearchTree = (bst, name = 'bst') => {
  if (!(bst instanceof BinarySearchTree)) {
    throw `${name} is not a BinarySearchTree`;
  }
};

export class BinarySearchTree {

  constructor() {
    this.root_ = null;
  }

  root() {
    return this.root_;
  }

  insert(value) {
    throwIfNotType(value, 'number', 'value');
    const valueNode = new Node(value);
    if (this.root_ === null) {
      this.root_ = valueNode;
    } else {
      this.insert_(valueNode, this.root_);
    }
  }

  delete(node) {
    throwIfNotNode(node);
    if (node.childCount() !== 0) {
      throw 'node has children. BinarySearchTree does not support deleting non-leaf nodes';
    }
    const parent = node.parent();
    if (parent !== null) {
      parent.deleteChild(node);
    }
  }

  getPreOrderIterator(node) {
    const getNext = function * (current) {
      if (current !== null) {
        yield current.value();
        if (current.left() !== null) {
          yield * getNext(current.left());
        }
        if (current.right() !== null) {
          yield * getNext(current.right());
        }
      }
    };
    return getNext(node);
  };

  insert_(node, parent) {
    if (node.value() < parent.value()) {
      if (parent.left() === null) {
        parent.addLeft(node);
      } else {
        this.insert_(node, parent.left());
      }
    } else {
      if (parent.right() === null) {
        parent.addRight(node);
      } else {
        this.insert_(node, parent.right());
      }
    }
  }
}
