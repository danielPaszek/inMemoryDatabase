import { IFilter, IObserver } from "../types";
export declare abstract class BaseDB<DataType> {
    protected pubSub: IObserver<DataType>;
    protected filter: IFilter<DataType>;
    getFilter(): IFilter<DataType>;
    subscribe(): {
        PushToDbListeners: import("../types").Subscribe<import("../types").PushEventType<DataType>>;
        RemoveFromDbListeners: import("../types").Subscribe<import("../types").RemoveEventType<DataType>>;
        GetFromDbListeners: import("../types").Subscribe<import("../types").GetEventType<DataType>>;
    };
    abstract visit(cb: (item: DataType) => void): void;
    protected abstract _push(item: DataType): void;
    push(item: DataType): void;
    protected abstract _get(id: keyof any | DataType): DataType | undefined;
    get(id: keyof any | DataType): DataType | undefined;
    print(): void;
    abstract clear(): void;
    protected abstract _pop(id?: keyof any | DataType): DataType | undefined;
    pop(item: DataType | keyof any): DataType | undefined;
    constructor(observer?: IObserver<DataType>, filter?: IFilter<DataType>);
}
