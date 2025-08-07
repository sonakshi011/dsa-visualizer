export class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    return [...this.items];
  }

  pop() {
    this.items.pop();
    return [...this.items];
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  getStack() {
    return [...this.items];
  }
}
