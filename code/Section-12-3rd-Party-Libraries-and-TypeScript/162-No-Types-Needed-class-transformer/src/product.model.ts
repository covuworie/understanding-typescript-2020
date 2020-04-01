export class Product {
    title: string;
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    public getInformation() {
        return [this.title, `${this.price}`];
    }
}