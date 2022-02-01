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
  //
  abstract clear(): void;

  //default observer
  constructor(isDevMode: boolean, logDate?: boolean) {
    this.pubSub = new Observer<DataType>(logDate || false);
    this.filter = new Filter<DataType>();
    this.isDevMode = isDevMode;
  }
}
