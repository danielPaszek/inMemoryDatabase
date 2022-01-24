import { IObserver } from "../types";
export declare abstract class BaseDB<DataType> {
    protected pubSub: IObserver<DataType>;
    subscribe(): {
        PushToDbListeners: import("../types").Subscribe<import("../types").PushEventType<DataType>>;
        RemoveFromDbListeners: import("../types").Subscribe<import("../types").RemoveEventType<DataType>>;
        GetFromDbListeners: import("../types").Subscribe<import("../types").GetEventType<DataType>>;
    };
    abstract visit(cb: (item: DataType) => void): void;
    abstract _push(item: DataType): void;
    push(item: DataType): void;
    abstract _get(id: keyof any | DataType): DataType | undefined;
    get(id: keyof any | DataType): DataType | undefined;
    print(): void;
    abstract clear(): void;
    abstract _pop(id?: keyof any | DataType): void;
    pop(item: DataType | keyof any): void;
    constructor(observer?: IObserver<DataType>);
}
