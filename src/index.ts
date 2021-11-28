import * as fs from "fs";
import path from "path";
import { ArrayDB } from "./dbs/arrayDB";
import { Employee } from "./example-types";

const data: Employee[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../MOCK_DATA.json")).toString()
);
const myDB = new ArrayDB<Employee>();

const stopLogging = myDB
  .getPubSub()
  .afterAddToDbListeners.subscribe((el) => console.log(el));

for (let i = 0; i < 50; i++) {
  myDB.push(data[i]);
}
// last id:50
stopLogging();

for (let i = 51; i < 100; i++) {
  myDB.push(data[i]);
}
// still last id: 50
