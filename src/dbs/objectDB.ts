import { BaseDB } from "./BaseDB";
import { MapMinimalRecord } from "../types";

export class ObjectDB<
  DataType extends MapMinimalRecord
> extends BaseDB<DataType> {
  protected db: Record<keyof any, DataType>;
  public constructor() {
    super();
    this.db = {};
  }
  get(id: keyof any): DataType | undefined {
    if (id) return this.db[id];
    else return undefined;
  }
  push(item: DataType): void {
    this.pubSub.beforeAddToDbListeners.publish({
      newValue: item,
      value: this.db[item.id],
    });
    try {
      this.db[item.id] = item;
    } catch (error) {
      throw new Error("push error");
    }
    this.pubSub.afterAddToDbListeners.publish({ newValue: item });
  }
  visit(cb: (item: DataType) => void): void {
    Object.keys(this.db).forEach((key) => cb(this.db[key]));
  }
  clear() {
    Object.keys(this.db).forEach((key) => delete this.db[key]);
  }
}
