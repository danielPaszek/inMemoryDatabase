interface Address {
  street: string;
  house: number;
  city: string;
}
type Title = "junior" | "regular" | "senior" | "PM" | "secretary";
type Department = "IOT" | "cloud" | "webDev" | "maintenance";
type Position = `${Title}In${Capitalize<Department>}`;
type Gender = "man" | "woman";

export interface Employee {
  name: string;
  surname: string;
  id: number;
  email: string;
  gender: Gender;
  address: Address;
  position: Position;
}
