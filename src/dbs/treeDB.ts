import { IFilter, IObserver, TreeMinimalRecord } from "../types";
import { BasicTreeDB } from "./basicTreeDB";
/**
 * @template DataType require valuOf(): number | string to evaluate object
 *
 */
export class TreeDB<
  DataType extends TreeMinimalRecord
> extends BasicTreeDB<DataType> {
  getMax() {
    return this.db.findMax();
  }
  getMin() {
    return this.db.findMin();
  }
  getPreOrder() {
    return this.db.preOrder();
  }
  getPostOrder() {
    return this.db.postOrder();
  }
  getInOrder() {
    return this.db.inOrder();
  }
  contains(item: DataType) {
    return this.db.contains(item);
  }
  public constructor(isDevMode: boolean, logDate?: boolean) {
    super(isDevMode, logDate);
  }
}
