export class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(value) {
    const newNode = new ListNode(value);
    if (!this.head) this.head = newNode;
    else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = newNode;
    }
    return this.traverse();
  }

  delete(value) {
    if (!this.head) return [];
    if (this.head.value === value) {
      this.head = this.head.next;
      return this.traverse();
    }
    let temp = this.head;
    while (temp.next && temp.next.value !== value) {
      temp = temp.next;
    }
    if (temp.next) temp.next = temp.next.next;
    return this.traverse();
  }

  traverse() {
    let res = [], temp = this.head;
    while (temp) {
      res.push(temp.value);
      temp = temp.next;
    }
    return res;
  }
}