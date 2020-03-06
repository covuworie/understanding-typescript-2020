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
    configurable: true,
    enumerable: false,
    get() {
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

const printer = new Printer();
printer.showMessage();

const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);

// ---

function Required() {}

function PositiveNumber() {}

function Validate(obj: object) {}

class Course {
  @Required
  public title: string;
  @PositiveNumber
  public price: number;

  public constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
  event.preventDefault();  // don't submit the form
  const titleElement = document.getElementById("title") as HTMLInputElement;
  const priceElement = document.getElementById("price") as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value; 

  const createdCourse = new Course(title, price);

  if (!Validate(createdCourse)) {
    alert('Invalid input, please try again!');
  }
  console.log(createdCourse);
})