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

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
    console.log(`Name: ${employee.name}`);
    if ('privileges' in employee) {
        console.log(`Priviledges: ${employee.privileges}`);
    }
    if ('startDate' in employee) {
        console.log(`Start Date: ${employee.startDate}`);
    }
}

printEmployeeInformation({name: 'Manu', startDate: new Date()});

class Car {
    public drive() {
        console.log('Driving...');
    }
}

class Truck {
    public drive() {
        console.log('Driving truck...');
    }

    public loadCargo(amount: number) {
        console.log(`Loading cargo...${amount}`);
    }
}

type Vehicle = Car | Truck;

const vehicle1 = new Car();
const vehicle2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(vehicle1);
useVehicle(vehicle2);

interface Bird {
    type: 'bird';  // literal type that discriminates type of object
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';  // literal type that discriminates type of object
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`Moving at speed: ${speed}`);
}

moveAnimal({
    type: 'bird',
    flyingSpeed: 10
});

// const userInputElement = <HTMLInputElement>document.getElementById('user-input');

const userInputElement = document.getElementById('user-input');

if (userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Hi there!';
}
