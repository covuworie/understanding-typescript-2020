class Department {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    describe(this: Department) {
        console.log(`Department: ${this.name}`);
    }
}

const accounting = new Department('Accounting');

accounting.describe();

const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();