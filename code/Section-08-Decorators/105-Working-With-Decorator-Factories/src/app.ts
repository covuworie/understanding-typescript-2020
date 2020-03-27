// Decorator Factory allows us to now pass in parameters that will be used by the 
// decorator function (the inner function). Note that the factory returns the 
// decorator function and now we must invoke the factory below.
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

@Logger('LOGGING - PERSON')
class Person {
    public name = 'Max';

    public constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

console.log(person);