"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Address = Schema({
  customer: { type: Schema.Types.ObjectId, ref: "customer", required: true },
  receiver: { type: String, required: true },
  dni: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: false },
  province: { type: String, required: false },
  district: { type: String, required: false },
  principal: { type: Boolean, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("address", Address);
