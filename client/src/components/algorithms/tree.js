export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) this.root = newNode;
    else {
      const queue = [this.root];
      while (queue.length) {
        const current = queue.shift();
        if (!current.left) {
          current.left = newNode;
          break;
        } else queue.push(current.left);
        if (!current.right) {
          current.right = newNode;
          break;
        } else queue.push(current.right);
      }
    }
    return this.levelOrder();
  }

  levelOrder() {
    let res = [], queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (!node) continue;
      res.push(node.value);
      queue.push(node.left, node.right);
    }
    return res;
  }
}
