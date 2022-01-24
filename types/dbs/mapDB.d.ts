import { BaseDB } from "./BaseDB";
import { IObserver, MapMinimalRecord } from "../types";
export declare class MapDB<DataType extends MapMinimalRecord> extends BaseDB<DataType> {
    protected db: Map<keyof any, DataType>;
    constructor(observer?: IObserver<DataType>);
    protected _pop(id: keyof any | DataType): DataType | undefined;
    protected _get(id?: keyof any | DataType): DataType | undefined;
    protected _push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
