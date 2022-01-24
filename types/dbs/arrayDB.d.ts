import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";
export declare class ArrayDB<DataType> extends BaseDB<DataType> {
    protected db: DataType[];
    constructor(observer?: IObserver<DataType>);
    _pop(item: DataType): void;
    _get(item: keyof any | DataType): DataType | undefined;
    _push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
