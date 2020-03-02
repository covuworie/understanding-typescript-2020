type Admin = {
    name: string;
    privileges: string[]
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const employee1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Max', 'Schwarz');
result.split(' ');

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }  // this property may or may not exist on a specific instance
};

console.log(fetchedUserData?.job?.title);

const userInput = undefined;  // or null or ''

// works for any userInput Falsy value including empty string!!!
// const storedData = userInput || 'DEFAULT'; 

// if we only want this behavior for null and undefined we use the nullish coalescing operator:
const storedData = userInput ?? 'DEFAULT'; 

console.log(storedData);
