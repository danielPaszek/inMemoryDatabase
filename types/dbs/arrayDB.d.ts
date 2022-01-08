import { IObserver } from "../types";
import { BaseDB } from "./BaseDB";
export declare class ArrayDB<DataType> extends BaseDB<DataType> {
    protected db: DataType[];
    constructor(observer?: IObserver<DataType>);
    pop(item: DataType): void;
    get(item?: keyof any | DataType): DataType | undefined;
    push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
