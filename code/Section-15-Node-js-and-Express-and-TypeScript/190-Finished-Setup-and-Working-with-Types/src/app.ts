// 1: At a terminal run "node_modules/.bin/tsc -w"
// 2. From a different terminal run "npm start" to start the web server with nodemon
//    which watches for file changes and automatically reloads the server 
//
// Go to http://localhost:3000/ to view the running web server (which does nothing!)

import express from 'express';

const app = express();

app.listen(3000);