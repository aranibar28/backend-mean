"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/cart");

var api = express.Router();

api.post("/add_cart_customer", [validateJWT], controllers.add_cart_customer);
api.get("/get_cart_customer/:id", [validateJWT], controllers.get_cart_customer);
api.delete("/delete_item_cart/:id", [validateJWT], controllers.delete_item_cart);

module.exports = api;
