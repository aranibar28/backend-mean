"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InventorySchema = Schema({
  product:   { type: Schema.Types.ObjectId, ref: "product", required: true },
  admin:     { type: Schema.Types.ObjectId, ref: "admin", required: true },
  quantity:  { type: Number, required: true },
  supplier:  { type: String, required: true },
  create_at: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("inventory", InventorySchema);
