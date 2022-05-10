"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartSchema = Schema({
  product:   { type: Schema.Types.ObjectId, ref: "product", required: true },
  customer:  { type: Schema.Types.ObjectId, ref: "customer", required: true },
  quantity:  { type: Number, required: true },
  variety:   { type: String, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("cart", CartSchema);
