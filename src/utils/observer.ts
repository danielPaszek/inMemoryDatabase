import {
  GetEventType,
  IObserver,
  Listener,
  PushEventType,
  RemoveEventType,
  Subscribe,
} from "../types";

export class Observer<DataType> implements IObserver<DataType> {
  private logDate: boolean;
  //get only new value
  private PushToDbListeners = this.createObserver<PushEventType<DataType>>();
  private RemoveFromDbListeners =
    this.createObserver<RemoveEventType<DataType>>();
  private GetFromDbListeners = this.createObserver<GetEventType<DataType>>();

  public getPushToDbListeners() {
    return this.PushToDbListeners;
  }
  public getRemoveFromDbListeners() {
    return this.RemoveFromDbListeners;
  }
  public getGetFromDbListeners() {
    return this.GetFromDbListeners;
  }
  private createObserver<EventType>(): {
    // subscribe returns unsubscribe function(like useEffect())
    subscribe: Subscribe<EventType>;
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
        if (!this.logDate) listeners.forEach((cb) => cb(ev));
        else listeners.forEach((cb) => cb({ ...ev, happenedAt: new Date() }));
      },
    };
  }
  constructor(logDate: boolean) {
    this.logDate = logDate;
  }
}
