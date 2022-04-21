"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true },
  password:   { type: String, required: true },
  role:       { type: String, required: true },
  phone:      { type: String, required: true },
  dni:        { type: String, required: true },
});

module.exports = mongoose.model("admin", AdminSchema);
