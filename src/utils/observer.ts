import { AfterEventType, BeforeEventType, Listener } from "../types";

export class Observer<DataType> {
  public beforeAddToDbListeners =
    this.createObserver<BeforeEventType<DataType>>();
  public afterAddToDbListeners =
    this.createObserver<AfterEventType<DataType>>();

  private createObserver<EventType>(): {
    // subscribe returns unsubscribe function(like useEffect())
    subscribe: (cb: Listener<EventType>) => () => void;
    // call all listeners
    publish: (ev: EventType) => void;
  } {
    let listeners: Listener<EventType>[] = [];
    return {
      subscribe: (cb: Listener<EventType>) => {
        listeners.push(cb);
        // unsubscribe function
        return () => (listeners = listeners.filter((func) => func !== cb));
      },
      publish: (ev) => {
        listeners.forEach((cb) => cb(ev));
      },
    };
  }
  constructor() {}
}
