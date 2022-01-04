import { TreeDB } from "pubs-db";
import { Employee } from "./types";
import * as fs from "fs";
import * as path from "path";

const rawData: Employee[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../MOCK_DATA.json")).toString()
);
const data = rawData.map((item) => new Employee(item));
const myDB = new TreeDB<Employee>();
const unsubscribe = myDB
  .subscribe()
  .AddAfterAddToDb(({ newValue }) => console.log(newValue));
const unsubscribe2 = myDB
  .subscribe()
  .AddBeforeAddToDb(({ newValue, value }) =>
    console.log(`newValue:${newValue} \n value:${value}`)
  );

for (let i = 0; i < 50; i++) {
  myDB.push(data[i]);
}
// last id:50
unsubscribe();
unsubscribe2();

for (let i = 51; i < 100; i++) {
  myDB.push(data[i]);
}
// still last id: 50

console.log(myDB.getMax());
console.log("GET IN ORDER");
console.log(myDB.getInOrder());
