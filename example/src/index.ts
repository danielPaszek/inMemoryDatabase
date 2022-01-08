import { MapDB } from "pubs-db";
import { Employee } from "./types";
import * as fs from "fs";
import * as path from "path";

const rawData: Employee[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../MOCK_DATA.json")).toString()
);
const data = rawData.map((item) => new Employee(item));
const myDB = new MapDB<Employee>();
const unsubscribe = myDB
  .subscribe()
  .AddAfterAddToDb(({ newValue }) => console.log(newValue));
// const unsubscribe2 = myDB
//   .subscribe()
//   .AddBeforeAddToDb(({ newValue, value }) =>
//     console.log("newValue:", newValue, "\n", "value:", value)
//   );

for (let i = 0; i < 50; i++) {
  myDB.push(data[i]);
}
// last id:50
unsubscribe();

for (let i = 50; i < 100; i++) {
  myDB.push(data[i]);
}
// still last id: 50 in console

// console.log(myDB.getMax());
// console.log("GET IN ORDER");
// console.log(myDB.getInOrder());

// Change to corporate email
for (let i = 1; i < 100; i++) {
  const temp = myDB.get(i);
  if (temp) {
    temp.email = temp.email.slice(temp.email.indexOf("@")) + "pubs.com";
    myDB.push(temp);
  } else {
    console.log("Couldn't find employee (probably fired recently XD?)", i);
  }
}
// swap gender of employee so fire him/her xd
const temp = myDB.get(15);
if (temp) {
  temp.gender = temp?.gender == "man" ? "woman" : "man";
  myDB.push(temp);
}
// can use temp or temp.id as well (if template is not a number!)
myDB.pop(temp?.id);
