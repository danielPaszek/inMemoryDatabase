import { BaseDB } from "./BaseDB";
import { IFilter, IObserver } from "../types";
import cloneDeep from "lodash.clonedeep";

/**
 * id is stored in db and also is a key!
 * @template DataType extends {id: keyof any} althought symbol is not recommended (because I'm not sure how it works)
 *
 */
export class MapDB<DataType> extends BaseDB<DataType> {
  protected db: Map<keyof any, DataType>;
  public constructor(
    isDevMode: boolean,
    observer?: IObserver<DataType>,
    filter?: IFilter<DataType>
  ) {
    super(isDevMode, observer, filter);
    this.db = new Map<keyof any, DataType>();
    this.db.get(1);
  }
  /**
   * @param key pass only a key
   */
  protected _remove(key: keyof any) {
    let result: DataType | undefined;
    let temp = this.db.get(key);
    if (temp) {
      result = cloneDeep(temp);
    } else result = undefined;
    this.db.delete(key);
    return result;
  }
  /**
   * @param id can accept whole item or just id
   */
  protected _get(id: keyof any): DataType | undefined {
    return cloneDeep(this.db.get(id));
  }

  protected _push(value: DataType, key: keyof any): void {
    try {
      this.db.set(key, cloneDeep(value));
    } catch (error) {
      throw new Error("_push error");
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
