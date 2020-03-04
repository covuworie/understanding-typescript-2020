function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

// Angular has way more powerful decorators
function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const person = new constructor();
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector('h1')!.textContent = person.name;
        }
    }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    public name = 'Max';

    public constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

console.log(person);