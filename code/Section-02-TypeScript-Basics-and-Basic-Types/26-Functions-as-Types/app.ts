function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

// Function type saying combineValues should accept any function that takes two parameters of type number and returns a number
let combineValues: (a: number, b: number) => number;

combineValues = add;
// The typescript compiler correctly complains about the followign assignment
// combineValues = printResult;

console.log(combineValues(8, 8));