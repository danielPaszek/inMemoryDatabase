import { IFilter, IObserver } from "../types";
import { BaseDB } from "./BaseDB";
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import { compareDeepArrayIndex } from "../utils/utils";

interface arrayProps<T> {
  item?: T;
  index?: number;
}

// type lol<T> = T extends { item: number }
//   ? arrayProps<number>
//   : T extends { index: number }
//   ? arrayProps<number>
//   : Required<arrayProps<number>>;

export class ArrayDB<DataType> extends BaseDB<DataType> {
  protected db: DataType[];
  public constructor(isDevMode: boolean, logDate?: boolean) {
    super(isDevMode, logDate);
    this.db = [];
  }
  // shows error when neither field is passed and when both are passed. Nice
  public remove(props: { item: DataType }): DataType | undefined;
  public remove(props: { index: number }): DataType | undefined;
  public remove(props: arrayProps<DataType>): DataType | undefined {
    let result: DataType;
    try {
      if (props.index !== undefined) {
        result = this.db.splice(props.index, 1)[0];
      } else if (props.item !== undefined) {
        //TODO
        result = this.db.splice(
          compareDeepArrayIndex(this.db, props.item),
          1
        )[0];
      } else return;
      if (result !== undefined) {
        this.pubSub.getRemoveFromDbListeners().publish({ removeValue: result });
      }
      return result;
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }

  /**
   * @param props pass only an item and it will be treated as contain
   */
  public get(props: { item: DataType }): DataType | undefined;
  public get(props: { index: number }): DataType | undefined;
  public get(props: arrayProps<DataType>): DataType | undefined {
    let result: DataType | undefined;
    try {
      if (props.index !== undefined) {
        result = cloneDeep(this.db[props.index]);
      } else if (props.item !== undefined) {
        result = cloneDeep(this.db.find((el) => isEqual(el, props.item)));
      } else return;
      if (result !== undefined) {
        this.pubSub.getGetFromDbListeners().publish({ accessedValue: result });
      }
      return result;
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }
  public push(props: { item: DataType }): void;
  public push(props: { index: number }): void;
  public push(props: arrayProps<DataType>): void {
    try {
      if (props.item === undefined) return;
      if (!this.filter.isAllowed(props.item)) {
        throw new Error("Couldn't pass filter");
      }
      if (props.index !== undefined) {
        this.db[props.index] = cloneDeep(props.item);
      } else this.db.push(cloneDeep(props.item));
      this.pubSub.getPushToDbListeners().publish({ newValue: props.item });
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
    }
  }
  visit(cb: (item: DataType) => void): void {
    this.db.forEach((el) => cb(el));
  }
  clear(): void {
    this.db = [];
  }
}
