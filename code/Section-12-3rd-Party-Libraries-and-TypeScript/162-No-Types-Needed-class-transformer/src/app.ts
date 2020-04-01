import 'reflect-metadata';
//import { plainToClass } from 'class-transformer';

import { Product } from "./product.model"

// Backend data (e.g. json) that we want to deserialize into Product instances
const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 }
];

// This is how we would manually do the deserialization
const loadedProducts = products.map(prod => {
  return new Product(prod.title, prod.price);
});

// using class-transformer
// I followed the instructions exactly as in the video and still get the error
// message on the import above that "class-transformer" cannot be found even
// though it is installed in the node_modules directory: weird!!!
//const loadedProducts = plainToClass(Product, products);

for (const product of loadedProducts) {
  console.log(product.getInformation());
}
