import { BaseDB } from "./BaseDB";
import { BinaryTree, IFilter, IObserver, TreeMinimalRecord } from "../types";
import { Tree } from "../utils/tree";
import cloneDeep from "lodash.clonedeep";

export class BasicTreeDB<
  DataType extends TreeMinimalRecord
> extends BaseDB<DataType> {
  protected db: BinaryTree<DataType>;
  public constructor(isDevMode: boolean, logDate?: boolean) {
    super(isDevMode, logDate);
    this.db = new Tree<DataType>();
  }
  /**
   * @returns always returns void!
   */

  public remove(item: DataType): void {
    try {
      this.db.delete(item);
      this.pubSub.getRemoveFromDbListeners().publish({ removeValue: item });
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }

  public push(item: DataType): void {
    try {
      if (!this.filter.isAllowed(item)) {
        throw new Error("Couldn't pass filter");
      }
      this.db.insert(cloneDeep(item));
      this.pubSub.getPushToDbListeners().publish({ newValue: item });
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.inOrder().forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
