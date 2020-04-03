// It is not explained in the video that we need to set "moduleResolution": "node" in
// the tsconfig.json for the module to be found: 
// https://stackoverflow.com/questions/43704619/ts2307-cannot-find-module-class-validator

import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import { Product } from "./product.model"

// Backend data (e.g. json) that we want to deserialize into Product instances
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 }
];

// This is how we would manually do the deserialization
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// using class-transformer
const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}
