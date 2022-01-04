import { IObserver } from "../types";
export declare abstract class BaseDB<DataType> {
    protected pubSub: IObserver<DataType>;
    subscribe(): {
        AddBeforeAddToDb: import("../types").Subscribe<import("../types").BeforeEventType<DataType>>;
        AddAfterAddToDb: import("../types").Subscribe<import("../types").AfterEventType<DataType>>;
    };
    abstract visit(cb: (item: DataType) => void): void;
    abstract push(item: DataType): void;
    abstract get(id?: keyof any): DataType | undefined;
    print(): void;
    abstract clear(): void;
    constructor(observer?: IObserver<DataType>);
}
