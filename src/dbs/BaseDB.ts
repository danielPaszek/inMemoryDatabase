import { Filter } from "./../utils/filter";
import { Observer } from "./../utils/observer";
import { IFilter, IObserver } from "../types";

export abstract class BaseDB<DataType> {
  //You can create your own observer that implements this interface :)
  //e.g with set instead of array
  protected pubSub: IObserver<DataType>;
  protected filter: IFilter<DataType>;
  protected isDevMode: boolean;
  public getFilter() {
    return this.filter;
  }

  public subscribe() {
    return {
      PushToDbListeners: this.pubSub.getPushToDbListeners().subscribe,
      RemoveFromDbListeners: this.pubSub.getRemoveFromDbListeners().subscribe,
      GetFromDbListeners: this.pubSub.getGetFromDbListeners().subscribe,
    };
  }
  abstract visit(cb: (item: DataType) => void): void;
  protected abstract _push(item: DataType, key?: keyof any): void;
  push(item: DataType, key?: keyof any): void {
    try {
      if (!this.filter.isAllowed(item)) {
        throw new Error("Couldn't pass filter");
      } else {
        this._push(item, key);
        this.pubSub
          .getPushToDbListeners()
          .publish({ newValue: item, happenedAt: new Date() });
      }
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
    }
  }
  protected abstract _get(id: keyof any | DataType): DataType | undefined;
  get(id: keyof any | DataType): DataType | undefined {
    try {
      const result = this._get(id);
      if (result) {
        this.pubSub
          .getGetFromDbListeners()
          .publish({ accessedValue: result, happenedAt: new Date() });
        return result;
      } else {
        throw new Error("accessed value is undefined");
      }
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return undefined;
    }
  }
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  protected abstract _remove(id?: keyof any | DataType): DataType | undefined;
  /**
   * @param item pass id when it makes sense :)
   */
  remove(item: DataType | keyof any): DataType | undefined {
    try {
      const result = this._remove(item);
      if (result) {
        this.pubSub
          .getRemoveFromDbListeners()
          .publish({ removeValue: result, happenedAt: new Date() });
      }
      return result;
    } catch (error: any) {
      if (this.isDevMode) console.log(error.message);
      return;
    }
  }
  //default observer
  constructor(
    isDevMode: boolean,
    observer: IObserver<DataType> = new Observer<DataType>(),
    filter: IFilter<DataType> = new Filter<DataType>()
  ) {
    this.pubSub = observer;
    this.filter = filter;
    this.isDevMode = isDevMode;
  }
}
