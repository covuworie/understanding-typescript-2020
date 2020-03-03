// function merge<T, U>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }

// the assign fails silenty as 30 is not an object 
// const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, 30);
// console.log(mergedObj);

// so we constrain the generic types
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

// now we get an error because 30 is not an object and we are forced to pass an object for the age
const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log(mergedObj);