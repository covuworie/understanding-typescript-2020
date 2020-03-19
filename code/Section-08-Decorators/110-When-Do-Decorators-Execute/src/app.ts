function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function(constructor: any) {
    console.log("Rendering template");
    const person = new constructor();
    const hookElement = document.getElementById(hookId);
    if (hookElement) {
      hookElement.innerHTML = template;
      hookElement.querySelector("h1")!.textContent = person.name;
    }
  };
}

// The output shows that as expected the decorator factories run top to bottom as in normal javascript. However the actual decorator functions run from bottom to top.
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  public name = "Max";

  public constructor() {
    console.log("Creating person object...");
  }
}

const person = new Person();

console.log(person);

// ---------

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

// for instance methods "target" is the prototype, for static methods is the constructor function
function Log3(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

function Log4(target: any, methodName: string | Symbol, position: number) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(methodName);
    console.log(position);
}

class Product {
  // Output shows that property decorator runs when the class is defined
  @Log
  public title: string;
  private _price: number;

  @Log2
  public set price(val: number) {
    if (val <= 0) {
      throw new Error("Invalid price - should be postive!");
    }
    this._price = val;
  }

  public constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  public getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Output shows that the decorator code doesn't run more often when we instantiate objects. Reinforces the fact that the decorators run when the class is defined!
const product1 = new Product('Book 1', 19);
const product2 = new Product('Book 2', 29);
