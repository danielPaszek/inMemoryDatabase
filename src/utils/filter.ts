import { IFilter } from "../types";

export class Filter<DataType> implements IFilter<DataType> {
  private filters = new Array<(item: DataType) => boolean>();
  /**
   * @param filter
   * @returns Returns remove function
   */
  public addFilter(filter: (item: DataType) => boolean) {
    this.filters.push(filter);
    return () => {
      this.filters = this.filters.filter((func) => func !== filter);
    };
  }

  public isAllowed(item: DataType): boolean {
    let results = true;
    for (const cb of this.filters) {
      results = results && cb(item);
    }
    return results;
  }
}
