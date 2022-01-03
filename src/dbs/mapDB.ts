import { BaseDB } from "./BaseDB";
import { IObserver, MapMinimalRecord } from "../types";

/**
 * id is stored in db and also is a key!
 *
 * @template DataType extends {id: keyof any} althought symbol is not recommended (because I'm not sure how it works)
 *
 */
export class MapDB<DataType extends MapMinimalRecord> extends BaseDB<DataType> {
  protected db: Map<keyof any, DataType>;
  public constructor(observer?: IObserver<DataType>) {
    super(observer);
    this.db = new Map<keyof any, DataType>();
  }
  get(id: keyof any): DataType | undefined {
    if (id) return this.db.get(id);
    else return undefined;
  }
  push(item: DataType): void {
    this.pubSub.getBeforeAddToDbListeners().publish({
      newValue: item,
      value: this.get(item.id),
    });
    try {
      this.db.set(item.id, item);
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.getAfterAddToDbListeners().publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
