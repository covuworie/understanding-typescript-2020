// Let typescript infer the return types instead of writing the following:
// function add(n1: number, n2: number) : number {
//   return n1 + n2;
// }

function add(n1: number, n2: number) {
  return n1 + n2;
}

// Let typescript infer the return type instead of writing the following:
// function printResult(num: number): void {
//   console.log('Result: ' + num);
// }

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

// void is actually equivalent to the undefined type!
console.log(printResult(add(5, 12)));

// we can define a variable as undefined
let someValue: undefined;

// void means we have no return statement in a function and we do not return a value whereas undefined requires that we must include a redundant return statement that returns no value!!! The function below is also valid with void as the return type!
function printResultUndefined(num: number): undefined {
  console.log('Result: ' + num);
  return;
}