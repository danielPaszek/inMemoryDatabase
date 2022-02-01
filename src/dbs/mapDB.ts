import { BaseDB } from "./BaseDB";
import { IFilter, IObserver } from "../types";
import cloneDeep from "lodash.clonedeep";

interface removeProps {
  key: keyof any;
  disableReturn?: boolean;
}
interface pushProps<T> {
  item: T;
  key: keyof any;
}
export class MapDB<DataType> extends BaseDB<DataType> {
  protected db: Map<keyof any, DataType>;
  public constructor(isDevMode: boolean, logDate?: boolean) {
    super(isDevMode, logDate);
    this.db = new Map<keyof any, DataType>();
    this.db.get(1);
  }
  /**
   *
   * @param props
   * @returns
   */
  public remove(props: removeProps): DataType | undefined {
    let result: DataType | undefined;
    try {
      if (!props.disableReturn) {
        let temp = this.db.get(props.key);
        if (temp) {
          result = cloneDeep(temp);
        }
      }
      this.db.delete(props.key);
      if (result !== undefined) {
        this.pubSub.getRemoveFromDbListeners().publish({ removeValue: result });
      }
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
    return result;
  }

  public get(key: keyof any): DataType | undefined {
    let result: DataType | undefined;
    try {
      result = cloneDeep(this.db.get(key));
      if (result !== undefined) {
        this.pubSub.getGetFromDbListeners().publish({ accessedValue: result });
      }
      return result;
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }

  public push(props: pushProps<DataType>): void {
    try {
      if (props.item === undefined) return;
      if (!this.filter.isAllowed(props.item)) {
        throw new Error("Couldn't pass filter");
      }
      this.db.set(props.key, cloneDeep(props.item));
      this.pubSub.getPushToDbListeners().publish({ newValue: props.item });
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear() {
    this.db.clear();
  }
}
