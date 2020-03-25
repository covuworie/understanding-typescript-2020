class Department {
    static fiscalYear = 2020;
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];  // accessible in this class and in derived classes

    constructor(private readonly id: string, public name: string) {
        // this.id = id;
        // this.name = name;
        // console.log(this.fiscalYear);  // cannot access static property from instance
        // console.log(Department.fiscalYear); // this works though
    }

    // static method used like a factory method
    public static createEmployee(name: string) {
        return { name: name };
    }

    describe(this: Department) {
        console.log(`Department: (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        // validation etc
        // this.id = 'd2';  // cannot change readonly property
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    public admins: string[];
    constructor(id: string, admins: string[]) {
        // must call super first before doing anything else
        super(id, 'IT');  // calls base class constructor
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;

    // getter
    public get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');   
    }

    public set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[] = []) {
        super(id, 'Accounting');
        this.lastReport = reports[-1];  // this is the correct code
    }

    public addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    public addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    public printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// accounting.employees[2] = 'Anna';  // cannot access private member

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('d2');

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong ...');

console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();