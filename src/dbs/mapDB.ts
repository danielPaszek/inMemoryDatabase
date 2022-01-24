import { BaseDB } from "./BaseDB";
import { IFilter, IObserver, MapMinimalRecord } from "../types";

/**
 * id is stored in db and also is a key!
 * @template DataType extends {id: keyof any} althought symbol is not recommended (because I'm not sure how it works)
 *
 */
export class MapDB<DataType extends MapMinimalRecord> extends BaseDB<DataType> {
  protected db: Map<keyof any, DataType>;
  public constructor(
    isDevMode: boolean,
    observer?: IObserver<DataType>,
    filter?: IFilter<DataType>
  ) {
    super(isDevMode, observer, filter);
    this.db = new Map<keyof any, DataType>();
  }
  /**
   * @param id can accept whole item or just id
   */
  protected _pop(id: keyof any | DataType) {
    if (
      typeof id === "string" ||
      typeof id === "symbol" ||
      typeof id === "number"
    ) {
      let result = this.db.get(id);
      if (result) {
        result = { ...result } as DataType;
      }
      this.db.delete(id);
      return result;
    } else {
      let result = this.db.get(id.id);
      if (result) {
        result = { ...result } as DataType;
      }
      this.db.delete(id.id);
      return result;
    }
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
        return this.db.get(id);
      else return this.db.get(id.id);
    }
    return undefined;
  }
  protected _push(item: DataType): void {
    try {
      this.db.set(item.id, item);
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
