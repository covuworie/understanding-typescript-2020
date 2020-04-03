import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from "./product.model"

// Backend data (e.g. json) that we want to deserialize into Product instances
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 }
];

const newProduct = new Product('', -5.99);
validate(newProduct).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  }
  console.log(newProduct.getInformation());
})



// This is how we would manually do the deserialization
// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// using class-transformer
const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}
