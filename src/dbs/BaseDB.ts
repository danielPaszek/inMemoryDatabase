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
  abstract get(id?: keyof any | DataType): DataType | undefined;
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  /**
   *
   * @param item pass id when it makes sense :)
   */
  abstract pop(item: DataType | keyof any): void;
  //default observer
  constructor(observer: IObserver<DataType> = new Observer<DataType>()) {
    this.pubSub = observer;
  }
}
