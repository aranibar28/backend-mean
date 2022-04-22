"use strict";
var express = require("express");
var { validateJWT } = require("../middlewares/authenticated");
var controllers = require("../controllers/product");

var api = express.Router();
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/products" });

api.get("/list_products/:filter?", [validateJWT], controllers.list_products);
api.post("/register_product", [validateJWT, path], controllers.register_product);

api.get("/get_banner/:img", controllers.get_banner);

module.exports = api;
