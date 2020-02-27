interface INamed {
    readonly name?: string;
    outputName?: string;  // optional property
}

// unlike for classes we can inherit from multiple interfaces
interface IGreetable extends INamed {
    greet(phrase: string): void;

    bye?(): void;  // optional method that is not implemented in the class
}

class Person implements IGreetable {
    age = 30;

    constructor(public name?: string) {}

    public greet(phrase: string) {
        if(this.name) {
            console.log(`${phrase} ${this.name}`);
        } else {
            console.log('Hi');
        }   
    }
}

let user1: IGreetable;

user1 = new Person();
user1.greet('Hi there - I am');

console.log(user1);