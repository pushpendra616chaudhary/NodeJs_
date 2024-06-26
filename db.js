const mongoose = require("mongoose");
require("dotenv").config();

// define the mongodb connection URL

const mongoURL = process.env.MONGODB_URL_LOCAL;
//const mongoURL = process.env.MONGODB_URL;

// set up MongoDb connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// // get the default connection
// // mongoose maintains a default connection object representing the mongoDB connection.

const db = mongoose.connection; //establish bridge bw mongo and node server

// define event listeners for database connection

db.on("connected", () => {
  console.log("connected to MongoDB server"); //whene mongo server connected to node server print this
});

db.on("error", () => {
  console.log("MongoDb connection error");
});

db.on("disconnected", () => {
  console.log("MongoDb disconnected");
});

//export the db connection
module.exports = db;
