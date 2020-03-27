// Using a union type does not accomplish our goal here and leads to TypeScript
// compilation errors. With generic types we could at instantiation fix the object to 
// either hold data of type string, number or boolean and we could freely add and 
// remove items. But with Union types we are left in a state where we can add a 
// mixture of strings, numbers and booleans.
// Generic types lock in a type so that you must call functions and methods with the
// same type on every call after instantiation.
// Union types are flexible so that you can call functions and methods with different 
// types on every call.
class DataStorage {
    private data: string[] | number[] | boolean[] = [];

    public addItem(item: string | number | boolean) {
        this.data.push(item);
    }

    public removeItem(item: string | number| boolean) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    public getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage();
// textStorage.add(10);  // error as 10 is not a string
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage();
