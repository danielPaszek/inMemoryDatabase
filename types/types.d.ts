export declare type Listener<EventType> = (ev: EventType) => void;
export interface PushEventType<T> {
    newValue: T;
    happenedAt: Date;
}
export interface RemoveEventType<T> {
    removeValue: T;
    happenedAt: Date;
}
export interface GetEventType<T> {
    accessedValue: T;
    happenedAt: Date;
}
export interface MapMinimalRecord {
    id: keyof any;
}
export interface TreeMinimalRecord {
    valueOf: () => number | string;
}
export interface INode<T> {
    value: T;
    left?: INode<T>;
    right?: INode<T>;
}
export interface BinaryTree<T> {
    insert(value: T): void;
    contains(value: T): boolean;
    findMin(): T | undefined;
    findMax(): T | undefined;
    preOrder(): T[];
    inOrder(): T[];
    postOrder(): T[];
    clear(): void;
    getRoot(): INode<T> | undefined;
    delete(item: T): void;
}
export declare type Subscribe<EventType> = (cb: Listener<EventType>) => () => void;
export interface IObserver<DataType> {
    getPushToDbListeners(): {
        subscribe: Subscribe<PushEventType<DataType>>;
        publish: (ev: PushEventType<DataType>) => void;
    };
    getRemoveFromDbListeners(): {
        subscribe: Subscribe<RemoveEventType<DataType>>;
        publish: (ev: RemoveEventType<DataType>) => void;
    };
    getGetFromDbListeners(): {
        subscribe: Subscribe<GetEventType<DataType>>;
        publish: (ev: GetEventType<DataType>) => void;
    };
}
export interface IFilter<DataType> {
    isAllowed(item: DataType): boolean;
    addFilter(filter: (item: DataType) => boolean): () => void;
}
