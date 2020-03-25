let userInput : unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
  userName = userInput;
}

// Explicitly tell typescript compiler that this function never returns
function generateError(message: string, code: number) : never {
  throw { message: message, errorCode: code};
}

const result = generateError('An error occured!', 500);
// typescript compiler assumes that the return type of the function is void even and the undefined value is not returned from the function!
console.log(result);