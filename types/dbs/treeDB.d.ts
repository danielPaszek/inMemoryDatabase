import { TreeMinimalRecord } from "../types";
import { BasicTreeDB } from "./basicTreeDB";
export declare class TreeDB<DataType extends TreeMinimalRecord> extends BasicTreeDB<DataType> {
    getMax(): DataType | undefined;
    getMin(): DataType | undefined;
    getPreOrder(): DataType[];
    getPostOrder(): DataType[];
    getInOrder(): DataType[];
    contains(item: DataType): boolean;
}
