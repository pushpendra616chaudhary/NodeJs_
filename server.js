// // console.log("server file is running");

// // var add = function (a, b) {
// //     return a + b;
// // }

// // var add = (a, b) => {
// //     return a + b
// // };

// var add = (a, b) => a + b;
// var result = add(2, 6);
// console.log(result);

// (function () {
//     console.log("prince");
// })();

// add(2, 7, function () {
//     console.log('add completed');
// });

// add(2, 5, () => console.log("add completed"));

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!', () => {
//     console.log('file is created');
// });

// console.log(fs);

// import files and package;
// const notes = require('./notes.js');
// var _ = require('lodash');
// var age = notes.age;

// var result = notes.addNumber(age + 3, 7);
// console.log(result)
// console.log(age);

// var data = ["goli", "kaka", "goli", 1, 3, 1, 2, 1, 3,"goli"];
// it will give unique values
// var filter = _.uniq(data);
// console.log(filter);

//API Day3

// const jsonString = '{"name": "john","age":30,"hobbies":"gym"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);

// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

// app.get('/chicken', (req, res) => {
//     res.send("i woul love to serve chicken")
// })

// app.get('/idli', (req, res) => {
//     var customized_idli = {
//         name: 'rava idli',
//         size: '10 cm diameter',
//         is_sambhar: true,
//         is_chutney: false
//     }
//     res.send(customized_idli)
// })

// app.post('/itemss', (req, res) => {

// })

// app.listen(3000, () => {
//     console.log("Listening on port 3000...");
// })

/////////////////////////////////////////////////////////////////////

// day 5 connection of mongodb and node.js

const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body // JSON data ko parse karne ke liye middleware
const PORT = process.env.PORT || 3000;

//middleware function

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Mode to : ${req.originalUrl}`
  );
  next(); //move on to the next middleware or route function
};

app.use(logRequest); // added this middleware on all route

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("wlcome to my hotel... How can i help you?, we have list of menus");
});

// GET method to get the person

//import the routers files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
//use the routers
app.use("/person", personRoutes); // /person this is here becouse we removed from personRoutes.js file
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 3000...");
});
