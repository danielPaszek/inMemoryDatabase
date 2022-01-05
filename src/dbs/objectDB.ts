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
  pop(key: keyof any | DataType) {
    if (key) {
      if (
        typeof key === "string" ||
        typeof key === "symbol" ||
        typeof key === "number"
      )
        delete this.db[String(key)];
      else delete this.db[String(key.id)];
    }
  }
  /**
   * @param id can accept whole item or just id
   */
  get(id?: keyof any | DataType): DataType | undefined {
    if (id) {
      if (
        typeof id === "string" ||
        typeof id === "symbol" ||
        typeof id === "number"
      )
        return this.db[String(id)];
      else return this.db[String(id.id)];
    }
    return undefined;
  }
  push(item: DataType): void {
    this.pubSub.getBeforeAddToDbListeners().publish({
      newValue: item,
      value: this.db[String(item.id)],
    });
    try {
      this.db[String(item.id)] = item;
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.getAfterAddToDbListeners().publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    Object.keys(this.db).forEach((key) => cb(this.db[key]));
  }
  clear() {
    Object.keys(this.db).forEach((key) => delete this.db[key]);
  }
}
