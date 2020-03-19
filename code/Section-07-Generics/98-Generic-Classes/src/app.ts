class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    public addItem(item: T) {
        this.data.push(item);
    }

    public removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    public getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
// textStorage.add(10);  // error as 10 is not a string
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// Code doesn't really work for objects => we need workarounds 
// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());