enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR };

const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

// avoid any at all costs!!!
let favoriteActivities: any[];
favoriteActivities = ['Sports', 5];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role == Role.AUTHOR) {
    console.log('is author');
}