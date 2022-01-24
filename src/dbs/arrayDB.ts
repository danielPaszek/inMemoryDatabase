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
   */
  protected _pop(item: DataType) {
    try {
      if (typeof item === "number") {
        const result = this.db.splice(item, 1);
        return result[0];
      } else {
        const result = this.db.splice(this.db.indexOf(item), 1);
        return result[0];
      }
    } catch (error) {
      console.log(error);
      return undefined;

    }
  }

  /**
   * @param item it can be index(if you pass number-even if your template is number!) or element(to be used as contains method)
   */
  protected _get(item: keyof any | DataType): DataType | undefined {
    try {
      if (typeof item === "number") {
        return this.db[item];
      } else {
        return this.db.find((el) => el === item);
      }
    } catch (error) {
      return undefined;
    }
  }

  protected _push(item: DataType): void {
    try {
      this.db.push(item);
    } catch (error) {
      throw new Error("_push error");
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear(): void {
    this.db = [];
  }
}
