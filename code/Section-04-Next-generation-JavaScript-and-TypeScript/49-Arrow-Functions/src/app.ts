const userName = 'Max';

let age = 30;

age = 29;
var result;

const add = (a: number, b: number) => a + b;  // implicit return statement

console.log(add(2, 5));

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', event => console.log(event));
}

printOutput(add(2, 5));