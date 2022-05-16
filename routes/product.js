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

// Galery
api.put("/update_product_galery/:id", [validateJWT, validateROLE, path], controllers.update_product_galery);
api.put("/delete_product_galery/:id", [validateJWT, validateROLE], controllers.delete_product_galery);

// Inventory
api.get("/list_inventory_product/:id", [validateJWT, validateROLE], controllers.list_inventory_product);
api.post("/register_inventory_product", [validateJWT, validateROLE], controllers.register_inventory_product);
api.delete("/delete_inventory_product/:id", [validateJWT, validateROLE], controllers.delete_inventory_product);

// Public whitout middlewares
api.get("/list_products_public/:filter?", controllers.list_products);
api.get("/list_product_by_slug/:slug", controllers.list_product_by_slug);
api.get("/list_product_recomended/:category", controllers.list_product_recomended);
api.get("/list_product_news", controllers.list_product_news);
api.get("/list_product_sales", controllers.list_product_sales);
api.get("/list_reviews_public/:id", controllers.list_reviews_public);

module.exports = api;
