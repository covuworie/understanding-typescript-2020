// 1. We can't send a request with the browser so download and install postman
//    (https://www.postman.com/).
// 2. Create a new request with postman:
//    a) Set the request type to "POST" and enter the endpoint http://localhost:3000/todos/..
//    b) Set the body type as "raw" and the text type as "JSON".
//    c) Enter the text body as:
//       {
//          "text": "Finish the course!"
//       }
//       Note that the value can be any string you want. It just has to conform to
//       what we extract in the middleware in controllers/todos.ts. Namely, the key
//       must be "text" and the value must be of type string.
//    d) Click "Send" to send the request and examine the response you get back.

import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import todoRoutes from "./routes/todos";

const app = express();

// Middleware that parses body of all incoming requests and extracts any json data it
// finds and populates the body key on the Request object with it.
app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
