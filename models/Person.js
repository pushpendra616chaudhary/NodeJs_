const mongoose = require("mongoose");
// Define the Person schema;
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //means name is required
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //email should be unique
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Create Person model or schema
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
