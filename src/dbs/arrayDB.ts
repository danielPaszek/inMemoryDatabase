import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";

export class ArrayDB<DataType> extends BaseDB<DataType> {
  protected db: DataType[];
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = [];
  }
  /**
   * PASS ONLY A VALUE! If DataType is e.g number
   * can't tell if you will delete by index or value
   * @param item PASS ONLY A VALUE!
   */
  pop(item: DataType) {
    this.db = this.db.filter((el) => el !== item);
  }
  /**
   * please don't use symbol here, I don't know how Number(Symbol) works
   * @param item it can be index or element(to be used as contains method)
   */
  get(item?: keyof any | DataType): DataType | undefined {
    if (typeof item === "number" || typeof item === "string") {
      return this.db[Number(item)];
    } else if (typeof item !== "symbol") {
      return this.db.find((el) => el === item);
    }
    return undefined;
  }
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
