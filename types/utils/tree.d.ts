import { BinaryTree, INode, TreeMinimalRecord } from "../types";
export declare class Tree<T extends TreeMinimalRecord> implements BinaryTree<T> {
    constructor();
    private root;
    getRoot(): INode<T> | undefined;
    private createNewNode;
    private InsertIntoCurrentNode;
    insert(value: T): void;
    contains(value: T): boolean;
    findMin(): T | undefined;
    findMax(): T | undefined;
    preOrder(): T[];
    inOrder(): T[];
    postOrder(): T[];
    clear(): void;
}
