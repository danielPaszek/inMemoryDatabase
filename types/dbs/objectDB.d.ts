import { BaseDB } from "./BaseDB";
import { IObserver, MapMinimalRecord } from "../types";
export declare class ObjectDB<DataType extends MapMinimalRecord> extends BaseDB<DataType> {
    protected db: Record<keyof any, DataType>;
    constructor(observer?: IObserver<DataType>);
    _pop(key: keyof any | DataType): void;
    _get(id?: keyof any | DataType): DataType | undefined;
    _push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
