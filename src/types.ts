export type Listener<EventType> = (ev: EventType) => void;
// export interface PushEventType<T> {
//   value?: T;
//   newValue: T;
// }
export interface PushEventType<T> {
  newValue: T;
}
export interface RemoveEventType<T> {
  removeValue: T;
}
export interface GetEventType<T> {
  accessedValue: T;
}
//checks if it has id
export interface MapMinimalRecord {
  id: keyof any;
}
//checks if it can evaluate object
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
export type Subscribe<EventType> = (cb: Listener<EventType>) => () => void;

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
