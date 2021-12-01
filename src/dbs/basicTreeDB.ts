import { BaseDB } from "./BaseDB";
import { BinaryTree, TreeMinimalRecord } from "../types";
import { Tree } from "src/utils/tree";

export class BasicTreeDB<
  DataType extends TreeMinimalRecord
> extends BaseDB<DataType> {
  protected db: BinaryTree<DataType>;
  public constructor() {
    super();
    this.db = new Tree<DataType>();
  }
  get(): DataType | undefined {
    return this.db.getRoot()?.value;
  }
  push(item: DataType): void {
    this.pubSub.getBeforeAddToDbListeners().publish({
      newValue: item,
    });
    try {
      this.db.insert(item);
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.getAfterAddToDbListeners().publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    this.db.inOrder().forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}