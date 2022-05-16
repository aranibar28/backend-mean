"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = Schema({
  product:   { type: Schema.Types.ObjectId, ref: "product", required: true },
  customer:  { type: Schema.Types.ObjectId, ref: "customer", required: true },
  sale:      { type: Schema.Types.ObjectId, ref: "sale", required: true },
  review:    { type: String, required: true },
  starts:    { type: Number, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("review", ReviewSchema);
