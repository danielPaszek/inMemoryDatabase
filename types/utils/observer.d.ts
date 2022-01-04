import { AfterEventType, BeforeEventType, IObserver, Subscribe } from "../types";
export declare class Observer<DataType> implements IObserver<DataType> {
    private beforeAddToDbListeners;
    private afterAddToDbListeners;
    getBeforeAddToDbListeners(): {
        subscribe: Subscribe<BeforeEventType<DataType>>;
        publish: (ev: BeforeEventType<DataType>) => void;
    };
    getAfterAddToDbListeners(): {
        subscribe: Subscribe<AfterEventType<DataType>>;
        publish: (ev: AfterEventType<DataType>) => void;
    };
    private createObserver;
    constructor();
}
