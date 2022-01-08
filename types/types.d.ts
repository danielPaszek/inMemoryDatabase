export declare type Listener<EventType> = (ev: EventType) => void;
export interface BeforeEventType<T> {
    value?: T;
    newValue: T;
}
export interface AfterEventType<T> {
    newValue: T;
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
    getBeforeAddToDbListeners(): {
        subscribe: Subscribe<BeforeEventType<DataType>>;
        publish: (ev: BeforeEventType<DataType>) => void;
    };
    getAfterAddToDbListeners(): {
        subscribe: Subscribe<AfterEventType<DataType>>;
        publish: (ev: AfterEventType<DataType>) => void;
    };
}
