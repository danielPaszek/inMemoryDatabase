interface Address {
  street: string;
  house: number;
  city: string;
}
type Title = "junior" | "regular" | "senior" | "PM" | "secretary";
type Department = "IOT" | "cloud" | "webDev" | "maintenance";
type Position = `${Title}In${Capitalize<Department>}`;
type Gender = "man" | "woman";

interface IEmployee {
  name: string;
  surname: string;
  id: number;
  email: string;
  gender: Gender;
  address: Address;
  position: Position;
}
export class Employee {
  public name: string;
  public surname: string;
  public id: number;
  public email: string;
  public gender: Gender;
  public address: Address;
  public position: Position;
  constructor(options: IEmployee) {
    this.name = options.name;
    this.surname = options.surname;
    this.id = options.id;
    this.email = options.email;
    this.gender = options.gender;
    this.address = options.address;
    this.position = options.position;
  }
  valueOf(): number {
    return this.id;
  }
}
