import { IObserver } from "../types";
import { Observer } from "../utils/observer";

export abstract class BaseDB<DataType> {
  //You can create your own observer that implements this interface :)
  //e.g with set instead of array
  protected pubSub: IObserver<DataType>;
  public subscribe() {
    return {
      AddBeforeAddToDb: this.pubSub.getBeforeAddToDbListeners().subscribe,
      AddAfterAddToDb: this.pubSub.getAfterAddToDbListeners().subscribe,
    };
  }
  abstract visit(cb: (item: DataType) => void): void;
  abstract push(item: DataType): void;
  abstract get(id?: keyof any): DataType | undefined;
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  //default observer
  constructor(observer: IObserver<DataType> = new Observer<DataType>()) {
    //observer has default value -> if not necessary
    this.pubSub = observer;
  }
}
