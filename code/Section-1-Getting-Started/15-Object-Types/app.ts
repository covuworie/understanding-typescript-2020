// Object type syntax
// const person: {
//     name: string;
//     age: number;
// } = {
// Typescript will infer the types in the object anyway => this is preferred
const person = {
    name: 'Maximilian',
    age: 30
};

console.log(person.name);