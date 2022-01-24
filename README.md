# pubs-db

It is an in memory database system package, that allows you to manage state for node.js.
It can replace redis in small projects where you need RAM database.
It has easy to use observer to monitor chaanges in your db.
We support few data structures like Tree, Map, Array and Object.

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
		PushToDbListeners: Subscribe<PushEventType<DataType>>
		RemoveFromDbListeners: Subscribe<RemoveEventType<DataType>>
		GetFromDbListeners: Subscribe<GetEventType<DataType>>
	}
	visit(cb: (item: DataType) => void): void
	push(item: DataType): void
	get(id?: keyof any | DataType): DataType | undefined
	clear(): void
	pop(item: keyof any | DataType): void
}
```
Of course dbs implement keyof any where it makes sense

### Observer

Every structure has pub sub design pattern implemented. Unsubscribe function is return (similar to useEffect).
You can choose when you want to activate your listeners (after push, after pop or after get).

```
const  unsubscribe = myDB.subscribe().PushToDbListeners(({ newValue }) =>  console.log(newValue));
// .....
unsubscribe();
```
