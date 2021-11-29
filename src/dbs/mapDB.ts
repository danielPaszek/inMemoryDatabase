import { BaseDB } from "./BaseDB";
import { MapMinimalRecord } from "../types";

export class MapDB<DataType extends MapMinimalRecord> extends BaseDB<DataType> {
  protected db: Map<keyof any, DataType>;
  public constructor() {
    super();
    this.db = new Map<keyof any, DataType>();
  }
  get(id: keyof any): DataType | undefined {
    if (id) return this.db.get(id);
    else return undefined;
  }
  push(item: DataType): void {
    this.pubSub.beforeAddToDbListeners.publish({
      newValue: item,
      value: this.get(item.id),
    });
    try {
      this.db.set(item.id, item);
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.afterAddToDbListeners.publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
