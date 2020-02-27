interface IGreetable {
    name: string;

    greet(phrase: string): void;
}

class Person implements IGreetable {
    age = 30;

    constructor(public name: string) {}

    public greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }

}

let user1: IGreetable;

user1 = new Person('Max');
user1.greet('Hi there - I am');

console.log(user1);