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
    // hope it works
    this.root = undefined;
  }
}
