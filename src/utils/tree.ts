import { BinaryTree, INode, TreeMinimalRecord } from "../types";

export class Tree<T extends TreeMinimalRecord> implements BinaryTree<T> {
  constructor() {}
  private root: INode<T> | undefined;
  public getRoot(): INode<T> | undefined {
    return this.root;
  }
  private createNewNode = (value: T): INode<T> => {
    return {
      value,
    };
  };
  private InsertIntoCurrentNode = (currentNode: INode<T>) => {
    const { value } = currentNode;
    const traverse = (node: INode<T>) => {
      if (value > node.value) {
        if (!node.right) node.right = currentNode;
        else traverse(node.right);
      } else {
        if (!node.left) node.left = currentNode;
        else traverse(node.left);
      }
    };
    traverse(this.root!);
  };
  insert(value: T) {
    const currentNode = this.createNewNode(value);
    if (!this.root) {
      this.root = currentNode;
    } else {
      this.InsertIntoCurrentNode(currentNode);
    }
  }
  contains(value: T) {
    const travers = (node: INode<T>): boolean => {
      if (!node) return false;
      else if (value === node.value) {
        return true;
      } else if (value < node.value) {
        return travers(node.left!);
      } else if (value > node.value) {
        return travers(node.right!);
      }
      return false;
    };
    return travers(this.root as INode<T>);
  }
  findMin() {
    let node = this.root;
    while (node) {
      if (!node.left) {
        return node.value;
      } else node = node.left;
    }
    return undefined;
  }
  findMax() {
    let node = this.root;
    while (node) {
      if (!node.right) {
        return node.value;
      } else node = node.right;
    }
    return undefined;
  }
  preOrder() {
    let results: T[] = [];
    const traverse = (node: INode<T>) => {
      results.push(node.value);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    };
    this.root && traverse(this.root);
    return results;
  }
  inOrder() {
    let results: T[] = [];
    const traverse = (node: INode<T>) => {
      node.left && traverse(node.left);
      results.push(node.value);
      node.right && traverse(node.right);
    };
    this.root && traverse(this.root);
    return results;
  }
  postOrder() {
    let results: T[] = [];
    const traverse = (node: INode<T>) => {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      results.push(node.value);
    };
    this.root && traverse(this.root);
    return results;
  }
  clear() {
    // I hope that's how garbage collector works :)
    this.root = undefined;
  }
  // copied from internet, I hope it works
  delete(item: T) {
    if (!this.root) return;

    if (!this.root.left && !this.root.right) {
      if (this.root.value == item) {
        this.root = undefined;
        return;
      } else return;
    }

    let q = [];
    q.push(this.root);
    let temp: INode<T> | undefined;
    let keyNode: INode<T> | undefined;

    // Do level order traversal until
    // we find key and last node.
    while (q.length > 0) {
      temp = q[0];
      q.shift();

      if (temp?.value == item) keyNode = temp;

      if (temp?.left) q.push(temp.left);

      if (temp?.right) q.push(temp.right);
    }

    if (keyNode) {
      let x = temp?.value;
      this.deleteDeepest(temp!);
      keyNode.value = x!;
    }
  }
  deleteDeepest(delNode: INode<T>) {
    let q = [];
    q.push(this.root);

    let temp = null;

    // Do level order traversal until last node
    while (q.length > 0) {
      temp = q[0];
      q.shift();

      if (temp == delNode) {
        temp = null;
        return;
      }
      if (temp?.right) {
        if (temp.right == delNode) {
          temp.right = undefined;
          return;
        } else q.push(temp.right);
      }

      if (temp?.left) {
        if (temp.left == delNode) {
          temp.left = undefined;
          return;
        } else q.push(temp.left);
      }
    }
  }
}
