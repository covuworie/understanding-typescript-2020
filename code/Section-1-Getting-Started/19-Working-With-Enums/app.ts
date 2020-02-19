enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR };

const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role == Role.AUTHOR) {
    console.log('is author');
}