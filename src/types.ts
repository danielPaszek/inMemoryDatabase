export type Listener<EventType> = (ev: EventType) => void;
export interface BeforeEventType<T> {
  value?: T;
  newValue: T;
}
export interface AfterEventType<T> {
  newValue: T;
}
//checks if it has id
export interface MapMinimalRecord {
  id: keyof any;
}
//checks if it can evaluate object
export interface TreeMinimalRecord {
  valueOf: () => any;
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
}
export type Subscribe<EventType> = (cb: Listener<EventType>) => () => void;

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
