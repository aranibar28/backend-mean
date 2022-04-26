"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CouponSchema = Schema({
  code:  { type: String, required: true },
  type:  { type: String, required: true },
  value: { type: Number, required: true },
  limit: { type: Number, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("coupon", CouponSchema);
