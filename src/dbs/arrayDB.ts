import { IFilter, IObserver } from "../types";
import { BaseDB } from "./BaseDB";
import cloneDeep from "lodash.clonedeep";

export class ArrayDB<DataType> extends BaseDB<DataType> {
  protected db: DataType[];
  public constructor(
    isDevMode: boolean,
    observer?: IObserver<DataType>,
    filter?: IFilter<DataType>
  ) {
    super(isDevMode, observer, filter);
    this.db = [];
  }

  /**
   *
   * @param id number will always be treated as INDEX!!!
   */
  protected _remove(
    id: string | number | symbol | DataType
  ): DataType | undefined {
    try {
      if (typeof id === "number") {
        const result = this.db.splice(id, 1);
        return result[0];
      } else if (typeof id === typeof this.db[0]) {
        const result = this.db.splice(this.db.indexOf(id as DataType), 1);
        return result[0];
      }
      return undefined;
    } catch (error) {
      throw new Error("_remove error");
    }
  }

  /**
   * @param item it can be index(if you pass number-even if your template is number!) or element(to be used as contains method)
   */
  protected _get(item: keyof any | DataType): DataType | undefined {
    try {
      if (typeof item === "number") {
        return cloneDeep(this.db[item]);
      } else {
        return cloneDeep(this.db.find((el) => el === item));
      }
    } catch (error) {
      throw new Error("_get error");
    }
  }

  protected _push(item: DataType): void {
    try {
      this.db.push(cloneDeep(item));
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
