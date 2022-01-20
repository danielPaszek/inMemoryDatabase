import { BaseDB } from "./BaseDB";
import { IObserver, MapMinimalRecord } from "../types";

/**
 * id is stored in db and also is a key!
 * @template DataType extends {id: keyof any} althought
 * symbol is converted to string
 */
export class ObjectDB<
  DataType extends MapMinimalRecord
> extends BaseDB<DataType> {
  protected db: Record<keyof any, DataType>;
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = {};
  }
  /**
   * @param id can accept whole item or just id
   */
  protected _pop(key: keyof any | DataType) {
    if (key) {
      if (
        typeof key === "string" ||
        typeof key === "symbol" ||
        typeof key === "number"
      ) {
        const result = this.db[key];
        delete this.db[key];
        return result;
      } else {
        const result = this.db[key.id];
        delete this.db[key.id];
        return result;
      }
    }
    return undefined;
  }
  /**
   * @param id can accept whole item or just id
   */
  protected _get(id?: keyof any | DataType): DataType | undefined {
    if (id) {
      if (
        typeof id === "string" ||
        typeof id === "symbol" ||
        typeof id === "number"
      )
        return this.db[id];
      else return this.db[id.id];
    }
    return undefined;
  }
  protected _push(item: DataType): void {
    try {
      this.db[item.id] = item;
    } catch (error) {
      throw new Error("push error");
    }
  }
  visit(cb: (item: DataType) => void): void {
    Object.keys(this.db).forEach((key) => cb(this.db[key]));
  }
  clear() {
    Object.keys(this.db).forEach((key) => delete this.db[key]);
  }
}
