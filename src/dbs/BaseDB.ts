import { NextObserver } from "src/utils/observerNext";
import { IObserver } from "../types";

export abstract class BaseDB<DataType> {
  //You can create your own observer that implements this interface :)
  //e.g with set instead of array
  protected pubSub: IObserver<DataType>;
  public subscribe() {
    return {
      PushToDbListeners: this.pubSub.getPushToDbListeners().subscribe,
      RemoveFromDbListeners: this.pubSub.getRemoveFromDbListeners().subscribe,
      GetFromDbListeners: this.pubSub.getGetFromDbListeners().subscribe,
    };
  }
  abstract visit(cb: (item: DataType) => void): void;
  abstract _push(item: DataType): void;
  push(item: DataType): void {
    try {
      this._push(item);
      this.pubSub.getPushToDbListeners().publish({ newValue: item });
    } catch (error) {
      console.log(error);
    }
  }
  abstract _get(id?: keyof any | DataType): DataType | undefined;
  get(id?: keyof any | DataType): DataType | undefined {
    try {
      const result = this._get(id);
      if (result) {
        this.pubSub.getGetFromDbListeners().publish({ accessedValue: result });
        return result;
      } else {
        throw new Error("accessed value is undefined");
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  abstract _pop(id?: keyof any | DataType): void;
  /**
   * @param item pass id when it makes sense :)
   */
  pop(item: DataType | keyof any): void {
    try {
      this._pop(item);
    } catch (error) {}
  }
  //default observer
  constructor(observer: IObserver<DataType> = new NextObserver<DataType>()) {
    this.pubSub = observer;
  }
}
