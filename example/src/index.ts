import { ArrayDB } from "pubs-db";
import { Employee } from "./types";
import * as fs from "fs";
import * as path from "path";

const data: Employee[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../MOCK_DATA.json")).toString()
);
const myDB = new ArrayDB<Employee>();
let currentCount = 0;

const subCount = () => {
  const unsubCount1 = myDB.subscribe().PushToDbListeners(() => currentCount++);
  const unsubCount2 = myDB
    .subscribe()
    .RemoveFromDbListeners(() => currentCount--);
  return () => {
    unsubCount2();
    unsubCount1();
  };
};
const unsubCount = subCount();

const unsubPushLog = myDB
  .subscribe()
  .PushToDbListeners(({ newValue }) => console.log("Added:", newValue));

const unsubRemoveLog = myDB
  .subscribe()
  .RemoveFromDbListeners(({ removeValue }) =>
    console.log("Removed:", removeValue)
  );

// to not spam the console
unsubRemoveLog();
unsubPushLog();

for (let i = 0; i < 50; i++) {
  myDB.push(data[i]);
}
console.log("currentCount", currentCount); //50
unsubCount();

for (let i = 50; i < 100; i++) {
  myDB.push(data[i]);
}
console.log("currentCount", currentCount); // still 50

// delete tenth employee :)
myDB.pop(10);

for (let i = 1; i < 100; i++) {
  const temp = myDB.get(i);
  if (temp) {
    temp.companyEmail = `${temp.name}.${temp.surname}@pubs.com`;
    myDB.push(temp);
  } else {
    console.log("Couldn't find employee (probably fired recently)", i);
  }
}
// swap gender of employee and fire him/her :)
const temp = myDB.get(15);
if (temp) {
  temp.gender = temp?.gender == "man" ? "woman" : "man";
  myDB.push(temp);

  // can use temp or temp.id as well because id is required
  myDB.pop(temp.id);
}
