class LRUCashe {
  constructor(length = 2) {
    this.length = length;
    this.queue = [];
    this.map = {};
  }

  get(key) {
    if (!this._isExist(key)) {
      return -1;
    }

    const value = this.map[key];
    this.put(key, value);

    return value;
  }

  put(key, value) {
    if (this._isExist(key)) {
      this._removeFromQueue(key);
    }

    this._add(key, value);

    if (this._reachLimit()) {
      this._removeUnderLimit();
    }
  }

  _reachLimit() {
    return this.queue.length > this.length;
  }

  _isExist(key) {
    return (
      typeof this.map[key] !== 'undefined' && typeof this.map[key] !== 'null'
    );
  }

  _removeUnderLimit() {
    const { key } = this.queue.shift();
    this._removeFromMap(key);
  }

  _add(key, value) {
    this.queue.push({ key, value }); // last value - it is last used value
    this.map[key] = value;
  }

  _removeFromQueue(key) {
    this.queue.slice(this.queue.findIndex(node => node == this.map[key]), 1);
  }

  _removeFromMap(key) {
    delete this.map[key];
  }
}

const cashe = new LRUCashe(3);

cashe.put(1, '1');
cashe.put(2, '2');
console.log(cashe.get(2));
cashe.put(3, '3');
cashe.put(4, '4');

console.log(cashe.queue);
