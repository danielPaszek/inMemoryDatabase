import { Observer } from "../utils/observer";

export abstract class BaseDB<DataType> {
  private pubSub: Observer<DataType>;
  public getPubSub(): Observer<DataType> {
    return this.pubSub;
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
