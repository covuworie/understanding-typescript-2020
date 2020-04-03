// It is not explained in the video that we need to set "moduleResolution": "node" in
// the tsconfig.json for the module to be found: 
// https://stackoverflow.com/questions/43704619/ts2307-cannot-find-module-class-validator

import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsPositive()
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    public getInformation() {
        return [this.title, `${this.price}`];
    }
}