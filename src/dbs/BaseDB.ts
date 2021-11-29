import { IObserver } from "src/types";
import { Observer } from "../utils/observer";

export abstract class BaseDB<DataType> {
  protected pubSub: IObserver<DataType>;
  public subscribe() {
    return {
      beforeAddToDb: this.pubSub.getBeforeAddToDbListeners().subscribe,
      afterAddToDb: this.pubSub.getAfterAddToDbListeners().subscribe,
    };
  }
  abstract visit(cb: (item: DataType) => void): void;
  abstract push(item: DataType): void;
  abstract get(id?: keyof any): DataType | undefined;
  print() {
    this.visit((item) => console.log(item));
  }
  abstract clear(): void;
  constructor() {
    this.pubSub = new Observer<DataType>();
  }
}
