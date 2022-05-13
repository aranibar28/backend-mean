"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DiscountSchema = Schema({
  title:       { type: String, required: true },
  banner:      { type: String, required: true },
  discount:    { type: Number, required: true },
  start_date:  { type: String, required: true },
  finish_date: { type: String, required: true },
  create_at:   { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("discount", DiscountSchema);
