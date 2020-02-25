class Department {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const accounting = new Department('Accounting');

console.log(accounting);