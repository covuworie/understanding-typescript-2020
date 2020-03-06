function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function<T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          hookElement.innerHTML = template;
          hookElement.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

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

const product1 = new Product("Book 1", 19);
const product2 = new Product("Book 2", 29);

function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    // Overwrite the properties and the get method and return a new PropertyDescriptor that binds the "this" variable automatically to the correct object
    configurable: true,
    enumerable: false,
    get() {
      // The trick here is to bind the "this" variable to the original method.Note that here "this" points to the object that is responsible for invoking the get method. It is not overwritten by "addEventListener" method which makes "this" point at the trigerring event. We avoid having to manually call bind everywhere it is needed (e.g. in the event listener at the bottom)
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    }
  };
  return adjustedDescriptor;
}

class Printer {
  public message = "This works!";

  @Autobind
  public showMessage() {
    console.log(this.message);
  }
}

// works here
const printer = new Printer();
printer.showMessage();

// and works here too!
const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);
