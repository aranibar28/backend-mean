"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactSchema = Schema({
  customer:  { type: String, required: true },
  subject:   { type: String, required: true },
  message:   { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true },
  status:    { type: String, required: true, default: "Abierto" },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("contact", ContactSchema);
