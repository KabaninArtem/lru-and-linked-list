export class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.length = 0;
    this._setBase();
  }

  push(node) {
    if (!this.head) {
      this._setBase(node);
    } else {
      this._addSlot(node);
    }

    this._encreaseLength();
  }

  shift() {
    const head = this.head;
    this.splice(this.head);

    return head;
  }

  splice(node) {
    if (this._isEmpty(node)) {
      this._setBase();
    } else if (this._isTail(node)) {
      this._setNewTail(node);
    } else if (this._isHead(node)) {
      this._setNewHead(node);
    } else {
      this._deleteSlot(node);
    }

    this._decreaseLength();
  }

  _encreaseLength() {
    this.length++;
  }

  _decreaseLength() {
    this.length--;
  }

  _setNewHead(node) {
    this.head = node;
    this.head.prev = null;
  }

  _setNewTail(node) {
    this.tail = node;
    this.tail.next = null;
  }

  _addSlot(node) {
    // [ x ]
    this.tail.next = node; // [ x -> node ]
    node.prev = this.tail; // [ x <-> node ]
    this.tail = node; // [ x <-> x ]
  }

  _deleteSlot(node) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;

    node.next = null;
    node.prev = null;
  }

  _setBase(base = null) {
    this.head = base;
    this.tail = base;
  }

  _isEmpty(node) {
    return this._isHead(node) && this._isTail(node);
  }

  _isTail(node) {
    return !node.next;
  }

  _isHead(node) {
    return !node.prev;
  }
}
