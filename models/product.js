"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true },
  galery:       { type: Object, required: false, default:[] },
  banner:       { type: String, required: true },
  price:        { type: Number, required: true },
  description:  { type: String, required: true },
  container:    { type: String, required: true },
  category:     { type: String, required: true },
  name_variety: { type: String, required: false },
  item_variety: { type: Object, required: false, default:[] },
  stock:        { type: Number, required: true },
  num_sales:    { type: Number, required: true, default: 0 },
  num_point:    { type: Number, required: true, default: 0 },
  estate:       { type: String, required: true, default: "Edicion" },
  create_at:    { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("product", ProductSchema);
