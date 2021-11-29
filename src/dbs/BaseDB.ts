import { Observer } from "../utils/observer";

export abstract class BaseDB<DataType> {
  protected pubSub: Observer<DataType>;
  public subscribe() {
    return {
      beforeAddToDb: this.pubSub.beforeAddToDbListeners.subscribe,
      afterAddToDb: this.pubSub.afterAddToDbListeners.subscribe,
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
