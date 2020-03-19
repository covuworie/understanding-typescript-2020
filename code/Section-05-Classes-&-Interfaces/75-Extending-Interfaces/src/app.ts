interface INamed {
    readonly name: string;
}

// unlike for classes we can inherit from multiple interfaces
interface IGreetable extends INamed {
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