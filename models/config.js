"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
  categories: { type: Object, required: true },
  title: { type: String, required: true },
  logo: { type: String, required: true },
  serie: { type: String, required: true },
  correlative: { type: String, required: true },
});

module.exports = mongoose.model("config", ConfigSchema);
