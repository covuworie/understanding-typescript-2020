type Admin = {
    name: string;
    privilidges: string[]
};

// can also do this with interfaces
// interface ElevatedEmployee extends Employee, Admin {}

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;  // intersection types

const employee1: ElevatedEmployee = {
    name: 'Max',
    privilidges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;  // intersection types