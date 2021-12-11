master
# PubsDB

It is an in memory database system package, that allows you to manage state. You can use it with node.js, react or other framework. We support few data structures like Tree, Map, Array and Object.

# Getting started

To use our state manager create new db ("name of data structure+DB")

```
import { TreeDB } from 'PubsDB'

const myDB = new TreeDB<DataType>();
```

Some of our structures require specific data type (e.g. Map requires id in your data type). We have full typescript support so your IDE should tell what exacly is required.

#### All of dbs implement interface

```
interface BasicDB<DataType> {
	subscribe():  {
		AddBeforeAddToDb: Subscribe<BeforeEventType<DataType>>
		AddAfterAddToDb: Subscribe<AfterEventType<DataType>>
	}
	visit(cb: (item: DataType) => void): void
	push(item: DataType): void
	get(id?: keyof any): DataType | undefined
	clear(): void
}
```

### Observer

Every structure has pub sub design pattern implemented. Unsubscribe function is return (like in useEffect).
We support listeners activating before or after adding element to db. To add listener pass it as argument

```
const  unsubscribe = myDB.subscribe().AddAfterAddToDb(({ newValue }) =>  console.log(newValue));
const  unsubscribe2 = myDB.subscribe().AddBeforeAddToDb(({ newValue, value }) => {
	console.log(`newValue:${newValue}  \n value:${value}`)
}
);
// .....
unsubscribe();
unsubscribe2();
```

## React TODO!

To use it with react you need to create your own hook. E.g:

```
export function useDataHook<DataType>(
	initialValue: DataType
): () => [DataType, (value: DataType) => void] {

}
```
=======
# pubs-db

It is an in memory database system package, that allows you to manage state. You can use it with node.js, react or other framework. We support few data structures like Tree, Map, Array and Object.

# Getting started

To use our state manager create new db ("name of data structure+DB")

```
import { TreeDB } from 'pubs-db'

const myDB = new TreeDB<DataType>();
```

Some of our structures require specific data type (e.g. Map requires id in your data type). We have full typescript support so your IDE should tell what exacly is required.

#### All of dbs implement interface

```
interface BasicDB<DataType> {
	subscribe():  {
		AddBeforeAddToDb: Subscribe<BeforeEventType<DataType>>
		AddAfterAddToDb: Subscribe<AfterEventType<DataType>>
	}
	visit(cb: (item: DataType) => void): void
	push(item: DataType): void
	get(id?: keyof any): DataType | undefined
	clear(): void
}
```

### Observer

Every structure has pub sub design pattern implemented. Unsubscribe function is return (like in useEffect).
We support listeners activating before or after adding element to db. To add listener pass it as argument

```
const  unsubscribe = myDB.subscribe().AddAfterAddToDb(({ newValue }) =>  console.log(newValue));
const  unsubscribe2 = myDB.subscribe().AddBeforeAddToDb(({ newValue, value }) => {
	console.log(`newValue:${newValue}  \n value:${value}`)
}
);
// .....
unsubscribe();
unsubscribe2();
```

## React TODO!

To use it with react you need to create your own hook. E.g:

```
export function useDataHook<DataType>(
	initialValue: DataType
): () => [DataType, (value: DataType) => void] {

}
```
master
