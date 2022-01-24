import { GetEventType, IObserver, PushEventType, RemoveEventType, Subscribe } from "../types";
export declare class Observer<DataType> implements IObserver<DataType> {
    private PushToDbListeners;
    private RemoveFromDbListeners;
    private GetFromDbListeners;
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
    private createObserver;
    constructor();
}
