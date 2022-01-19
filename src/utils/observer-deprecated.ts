// import {
//   AfterEventType,
//   BeforeEventType,
//   IObserver,
//   Listener,
//   Subscribe,
// } from "../types";

// export class Observer<DataType> implements IObserver<DataType> {
//   private beforeAddToDbListeners =
//     this.createObserver<BeforeEventType<DataType>>();
//   private afterAddToDbListeners =
//     this.createObserver<AfterEventType<DataType>>();
//   public getBeforeAddToDbListeners() {
//     return this.beforeAddToDbListeners;
//   }
//   public getAfterAddToDbListeners() {
//     return this.afterAddToDbListeners;
//   }
//   private createObserver<EventType>(): {
//     // subscribe returns unsubscribe function(like useEffect())
//     subscribe: Subscribe<EventType>;
//     // call all listeners
//     publish: (ev: EventType) => void;
//   } {
//     let listeners: Listener<EventType>[] = [];
//     return {
//       subscribe: (cb: Listener<EventType>) => {
//         listeners.push(cb);
//         // unsubscribe function
//         return () => (listeners = listeners.filter((func) => func !== cb));
//       },
//       publish: (ev) => {
//         listeners.forEach((cb) => cb(ev));
//       },
//     };
//   }
//   constructor() {}
// }
