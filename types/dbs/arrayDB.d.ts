import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";
export declare class ArrayDB<DataType> extends BaseDB<DataType> {
    protected db: DataType[];
    constructor(observer?: IObserver<DataType>);
    get(id: keyof any): DataType | undefined;
    push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
