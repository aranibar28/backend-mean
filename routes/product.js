"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/product");

var api = express.Router();
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/products" });

// Products
api.get("/list_products/:filter?", [validateJWT, validateROLE], controllers.list_products);
api.get("/list_product_by_id/:id", [validateJWT, validateROLE], controllers.list_product_by_id);
api.post("/register_product", [validateJWT, validateROLE, path], controllers.register_product);
api.put("/update_product/:id", [validateJWT, validateROLE, path], controllers.update_product);
api.put("/update_product_variety/:id", [validateJWT, validateROLE, path], controllers.update_product_variety);
api.delete("/delete_product/:id", [validateJWT, validateROLE, path], controllers.delete_product);
api.get("/get_banner/:img", controllers.get_banner);

// Inventorys
api.get("/list_inventory_product/:id", [validateJWT, validateROLE], controllers.list_inventory_product);
api.post("/register_inventory_product", [validateJWT, validateROLE], controllers.register_inventory_product);
api.delete("/delete_inventory_product/:id", [validateJWT, validateROLE], controllers.delete_inventory_product);

module.exports = api;
