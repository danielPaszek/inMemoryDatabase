import { BaseDB } from "./BaseDB";
import { BinaryTree, IObserver, TreeMinimalRecord } from "../types";
import { Tree } from "../utils/tree";

export class BasicTreeDB<
  DataType extends TreeMinimalRecord
> extends BaseDB<DataType> {
  protected db: BinaryTree<DataType>;
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = new Tree<DataType>();
  }
  pop(item: DataType) {
    this.db.delete(item);
  }
  /**
   * shouldn't use get in tree because it doesn't make a lot of sense
   * use contains instead
   * @returns root value for now
   */
  get(): DataType | undefined {
    return this.db.getRoot()?.value;
    // to use id
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
