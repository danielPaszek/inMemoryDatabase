import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";

export class ArrayDB<DataType> extends BaseDB<DataType> {
  protected db: DataType[];
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = [];
  }
  /**
   *
   * @param item number will always be treated as INDEX!!!
   * Otherwise as datatype AND WILL DELETE ALL OF ITS INSTANCES!
   */
  pop(item: DataType) {
    if (typeof item === "number") {
      this.db.splice(item, 1);
    } else {
      this.db = this.db.filter((el) => el !== item);
    }
  }
  /**
   * @param item it can be index(if you pass number-even if your template is number!) or element(to be used as contains method)
   */
  get(item?: keyof any | DataType): DataType | undefined {
    try {
      if (item === undefined) return undefined;
      if (typeof item === "number") {
        return this.db[item];
      } else {
        return this.db.find((el) => el === item);
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Doesn't return old value for O(1) push
   * @param item
   */
  push(item: DataType): void {
    this.pubSub.getBeforeAddToDbListeners().publish({
      newValue: item,
    });
    try {
      this.db.push(item);
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.getAfterAddToDbListeners().publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear(): void {
    this.db = [];
  }
}
