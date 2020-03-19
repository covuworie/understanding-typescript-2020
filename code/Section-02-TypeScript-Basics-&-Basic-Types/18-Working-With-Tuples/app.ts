const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]
} = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};

// Typescript does not catch this push error which leads to a variable length tuple being allowed!!!
// person.role.push('admin');  
// Typescript does catch this assignment error
// person.role[1] = 10;  
// and the length is enforced to catch this assignment error
// person.role = [0, 'admin', 'user'];


let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); !!! ERROR !!!
}