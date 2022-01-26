import { BaseDB } from "./BaseDB";
import { IFilter, IObserver, MapMinimalRecord } from "../types";
import cloneDeep from "lodash.clonedeep";

/**
 * id is stored in db and also is a key!
 * if you don't want this mechanic use mapDB!
 * @template DataType extends {id: keyof any}
 */
export class ObjectDB<
  DataType extends MapMinimalRecord
> extends BaseDB<DataType> {
  protected db: Record<keyof any, DataType>;
  public constructor(
    isDevMode: boolean,
    observer?: IObserver<DataType>,
    filter?: IFilter<DataType>
  ) {
    super(isDevMode, observer, filter);
    this.db = {};
  }
  /**
   * @param id can extract id from item or you can just pass id
   */
  protected _remove(key: keyof any | DataType) {
    if (key) {
      if (
        typeof key === "string" ||
        typeof key === "symbol" ||
        typeof key === "number"
      ) {
        let result: DataType | undefined;
        let temp = this.db[key];
        if (temp) {
          result = cloneDeep(temp);
        }
        delete this.db[key];
        return result;
      } else {
        let result: DataType | undefined;
        let temp = this.db[key.id];
        if (temp) {
          result = cloneDeep(temp);
        }
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
        return cloneDeep(this.db[id]);
      else return cloneDeep(this.db[id.id]);
    }
    return undefined;
  }
  protected _push(item: DataType, key: keyof any): void {
    try {
      if (typeof key !== "undefined") {
        this.db[key] = cloneDeep(item);
      } else this.db[item.id] = cloneDeep(item);
    } catch (error) {
      throw new Error("_push error");
    }
  }
  visit(cb: (item: DataType) => void): void {
    Object.keys(this.db).forEach((key) => cb(this.db[key]));
  }
  clear() {
    Object.keys(this.db).forEach((key) => delete this.db[key]);
  }
}
