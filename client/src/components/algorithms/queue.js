export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
    return [...this.items];
  }

  dequeue() {
    this.items.shift();
    return [...this.items];
  }

  getQueue() {
    return [...this.items];
  }
}
