"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleDetailSchema = Schema({
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  customer: { type: Schema.Types.ObjectId, ref: "customer", required: true },
  sale: { type: Schema.Types.ObjectId, ref: "sale", required: true },
  subtotal: { type: Number, required: true },
  quantity: { type: Number, required: true },
  variety: { type: String, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("sale_detail", SaleDetailSchema);
