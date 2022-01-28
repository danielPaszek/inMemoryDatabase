import { BaseDB } from "./BaseDB";
import { BinaryTree, IFilter, IObserver, TreeMinimalRecord } from "../types";
import { Tree } from "../utils/tree";
import cloneDeep from "lodash.clonedeep";

export class BasicTreeDB<
  DataType extends TreeMinimalRecord
> extends BaseDB<DataType> {
  protected db: BinaryTree<DataType>;
  public constructor(
    isDevMode: boolean,
    observer?: IObserver<DataType>,
    filter?: IFilter<DataType>
  ) {
    super(isDevMode, observer, filter);
    this.db = new Tree<DataType>();
  }
  /**
   *
   * @param item pass only a value
   * @returns always returns undefined!
   */

  protected _remove(item: DataType) {
    this.db.delete(item);
    return undefined;
  }
  /**
   * shouldn't use get in tree because it doesn't make a lot of sense
   * use contains instead!
   * @returns root value for now
   */
  protected _get(): DataType | undefined {
    return this.db.getRoot()?.value;
    // to use id
  }
  protected _push(item: DataType): void {
    try {
      this.db.insert(cloneDeep(item));
    } catch (error) {
      throw new Error("_push error");
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.inOrder().forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
