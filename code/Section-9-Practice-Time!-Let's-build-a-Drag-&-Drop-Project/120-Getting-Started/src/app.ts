function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class Person {
    public name = 'Max';

    public constructor() {
        console.log('Creating person object...');
    }
}

// The decorator runs when the TypeScript compiler finds the function definition in the class and not as instantiation time. For instance if we comment out the code below we still see the decorator output!
const person = new Person();

console.log(person);