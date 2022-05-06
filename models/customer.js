"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true },
  password:   { type: String, required: true },
  profile:    { type: String, required: true, default: "profile.png" },
  birthday:   { type: String, required: false },
  country:    { type: String, required: false, default:"" },
  phone:      { type: String, required: false },
  gender:     { type: String, required: false, default:"" },
  dni:        { type: String, required: false },
  create_at:   { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("customer", CustomerSchema);
