function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function(constructor: any) {
        console.log('Rendering template');
        const person = new constructor();
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector('h1')!.textContent = person.name;
        }
    }
}
 
// The output shows that as expected the decorator factories run top to bottom as in normal javascript. However the actual decorator functions run from bottom to top.
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    public name = 'Max';

    public constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

console.log(person);

// ---------

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

class Product {
    // Output show property decorator runs when the class is defined
    @Log
    public title: string;
    private _price: number;

    public set price(val: number) {
        if(val <= 0) {
            throw new Error('Invalid price - should be postive!');
        }
        this._price = val;
    }

    public constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }
    
    public getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}