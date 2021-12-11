import { BaseDB } from "./BaseDB";
import { IObserver, MapMinimalRecord } from "../types";

/**
 * id is stored in db and also is a key!
 * @template DataType extends {id: keyof any} althought with symbol some bugs might happen so it is not recommended;
 */
export class ObjectDB<
  DataType extends MapMinimalRecord
> extends BaseDB<DataType> {
  protected db: Record<keyof any, DataType>;
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = {};
  }
  get(id: keyof any): DataType | undefined {
    if (id) return this.db[String(id)];
    else return undefined;
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
