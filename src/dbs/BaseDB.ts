import { Filter } from "src/utils/filter";
import { Observer } from "src/utils/observer";
import { IFilter, IObserver } from "../types";

export abstract class BaseDB<DataType> {
  //You can create your own observer that implements this interface :)
  //e.g with set instead of array
  protected pubSub: IObserver<DataType>;
  protected filter: IFilter<DataType>;
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
  protected abstract _push(item: DataType): void;
  push(item: DataType): void {
    try {
      this._push(item);
      this.pubSub
        .getPushToDbListeners()
        .publish({ newValue: item, happenedAt: new Date() });
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  protected abstract _pop(id?: keyof any | DataType): DataType | undefined;
  /**
   * @param item pass id when it makes sense :)
   */
  pop(item: DataType | keyof any): DataType | undefined {
    try {
      const result = this._pop(item);
      if (result) {
        this.pubSub
          .getRemoveFromDbListeners()
          .publish({ removeValue: result, happenedAt: new Date() });
      } else throw new Error("poped value is undefined");
      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  //default observer
  constructor(
    observer: IObserver<DataType> = new Observer<DataType>(),
    filter: IFilter<DataType> = new Filter<DataType>()
  ) {
    this.pubSub = observer;
    this.filter = filter;
  }
}
