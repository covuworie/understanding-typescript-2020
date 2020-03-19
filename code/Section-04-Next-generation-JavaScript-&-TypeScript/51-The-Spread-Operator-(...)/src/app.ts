const userName = 'Max';

let age = 30;

age = 29;
var result;

const add = (a: number, b: number = 1) => a + b;  // implicit return statement

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

printOutput(add(5));

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);

const person = {
    name: 'Max',
    age: 30
}

const copiedPerson = { ...person };  // makes a copy of person