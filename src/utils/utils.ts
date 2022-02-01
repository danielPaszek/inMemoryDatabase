import isEqual from "lodash.isequal";
export function compareDeepArrayIndex(array: Array<any>, item: any): number {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(array[i], item)) return i;
  }
  return -1;
}

// try decorator
// export function dbAPI() {
//   return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

//   }
// }
