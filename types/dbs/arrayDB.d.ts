import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";
export declare class ArrayDB<DataType> extends BaseDB<DataType> {
    protected db: DataType[];
    constructor(observer?: IObserver<DataType>);
    protected _pop(item: DataType): DataType | undefined;
    protected _get(item: keyof any | DataType): DataType | undefined;
    protected _push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
