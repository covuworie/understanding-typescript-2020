// 1. We can't send a request with the browser so download and install postman
//    (https://www.postman.com/).
// 2. Create a new request with postman:
//    a) Set the request type to "POST" and enter the endpoint http://localhost:3000/todos/.
//    b) Set the body type as "raw" and the text type as "JSON".
//    c) Enter the text body as:
//       {
//          "text": "Finish the course!"
//       }
//       Note that the value can be any string you want. It just has to conform to
//       what we extract in the middleware in controllers/todos.ts. Namely, the key
//       must be "text" and the value must be of type string.
//    d) Click "Send" to send the request and examine the response you get back.
// 3. Create a new request with postman:
//    a) Set the request type to "GET" and enter the endpoint http://localhost:3000/todos/.
//    d) Click "Send" to send the request and examine the response you get back.
// 4. Create a new request with postman:
//    a) Repeat step 2 again (as the code has been updated, the server restarted and all
//       previous data has been lost.)
//    b) Set the request type to "PATCH" and enter the endpoint http://localhost:3000/todos/{id}
//       where {id} is the id of the previously entered todo.
//    c) Set the body type as "raw" and the text type as "JSON".
//    d) Enter the text body to something new that you desire such as:
//       {
//          "text": "Finish the course in one month!"
//       }
//    e) Click "Send" to send the request and examine the response you get back.
// 5. Repeat step 3 again and confirm there is indeed only one todo.
// 6. Repeat parts 4b, 4c, 4d and 4e with an id that does not exist and observe the output and
//    status code.
// 7. Create a new request with postman:
//    a) Repeat step 2 again (as the code has been updated, the server restarted and all
//       previous data has been lost.)
//    b) Set the request type to "DELETE" and enter the endpoint http://localhost:3000/todos/{id}
//       where {id} is the id of the previously entered todo.
//    c) Click "Send" to send the request and examine the response you get back.
//    d) Click "Send" to send the request again and examine the response you get back.
//    e) Repeat step 3 again.

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
