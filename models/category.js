"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = Schema({
  title:       { type: String, required: true },
  banner:      { type: String, required: true },
  icon:        { type: String, required: true },
  description: { type: String, required: false, default: "" },
  create_at:   { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("category", CategorySchema);
