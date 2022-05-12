"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleSchema = Schema({
  customer: { type: Schema.Types.ObjectId, ref: "customer", required: true },
  code: { type: String, required: true },
  subtotal: { type: Number, required: true },
  title_delivery: { type: String, required: true },
  price_delivery: { type: Number, required: true },
  transaction: { type: String, required: true },
  coupon: { type: String, required: false },
  status: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "address", required: true },
  notes: { type: String, required: false, default: "" },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("sale", SaleSchema);
