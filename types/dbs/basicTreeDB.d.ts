import { BaseDB } from "./BaseDB";
import { BinaryTree, IObserver, TreeMinimalRecord } from "../types";
export declare class BasicTreeDB<DataType extends TreeMinimalRecord> extends BaseDB<DataType> {
    protected db: BinaryTree<DataType>;
    constructor(observer?: IObserver<DataType>);
    pop(item: DataType): void;
    get(): DataType | undefined;
    push(item: DataType): void;
    visit(cb: (item: DataType) => void): void;
    clear(): void;
}
