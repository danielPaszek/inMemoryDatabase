import { MapDB } from "pubs-db";
import { Employee } from "./types";
import * as fs from "fs";
import * as path from "path";

const data: Employee[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../MOCK_DATA.json")).toString()
);
const myDB = new MapDB<Employee>(false);
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
unsubCount();
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

//Also lets store only men
myDB.getFilter().addFilter((employee) => employee.gender === "Male");

for (let i = 0; i < 50; i++) {
  myDB.push(data[i], i);
}

for (let i = 50; i < 100; i++) {
  myDB.push(data[i], i);
}

// delete random employee :)
myDB.remove(Math.floor(Math.random() * 100));
myDB.visit((el) => {
  const temp = myDB.get(el.id);
  if (temp) {
    temp.companyEmail = `${temp.name}.${temp.surname}@pubs.com`;
    myDB.push(temp);
  }
  // console.log(el);
});

// swap gender of employee and fire him/her :)
const temp = myDB.get(15);
if (temp) {
  temp.gender = temp?.gender == "Male" ? "Female" : "Male";
  myDB.push(temp);
}
unsubCount();
