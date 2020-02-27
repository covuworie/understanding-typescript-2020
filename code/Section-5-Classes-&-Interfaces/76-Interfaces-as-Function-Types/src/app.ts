// instead of using a type for this we can also use an interface!
// type AddFn = (a: number, b: number) => number;

interface IAddFn {
    (a: number, b: number): number;  // anonymous function in the interface
}

let add: IAddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

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