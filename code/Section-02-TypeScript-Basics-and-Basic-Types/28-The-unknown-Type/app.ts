// unknown is better than any as it doesn't allow you to do any type of assignment. But really use the union type if you know the types before runtime.
let userInput : unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
// Must include this type check for an 'unknown' variable type to appease the typescript compiler. If 'userInput' was of type 'any' this would not be needed
if (typeof userInput === 'string') {
  userName = userInput;
}
