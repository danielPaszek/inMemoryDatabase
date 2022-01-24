import { IFilter } from "../types";
export declare class Filter<DataType> implements IFilter<DataType> {
    private filters;
    addFilter(filter: (item: DataType) => boolean): () => void;
    isAllowed(item: DataType): boolean;
}
