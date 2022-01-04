# pubs-db

It is an in memory database system package, that allows you to manage state for node.js. We support few data structures like Tree, Map, Array and Object.

### For PO project
Check src and examples folders. Lib and types are generated and they are published to npmjs.com

# Getting started

install via npm

```
npm install pubs-db
```

To use our state manager create new db ("name of data structure+DB")

```
import { TreeDB } from 'pubs-db'

const myDB = new TreeDB<DataType>();
```

Some of our structures require specific data type (e.g. Map requires id in your data type). We have full typescript support so your IDE should tell you what exacly is required.

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

Every structure has pub sub design pattern implemented. Unsubscribe function is return (similar to useEffect).
We support listeners activating before or after adding element to db. To add listener pass it as argument

You can create your own observer that implements IObserver<T> interface and pass it as an argument to replace default.

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
