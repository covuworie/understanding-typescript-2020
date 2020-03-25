function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

// Callback function type
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
  // paramaters are enforced in the callback signature but return types are ignored
  return result;  
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8, 8));

// the type specification is not needed here due to the function type specification in the callback above
addAndHandle(10, 20, (result) => {
  console.log(result);
});