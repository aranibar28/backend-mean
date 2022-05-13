"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/discount");

var api = express.Router();
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/discounts" });

api.get("/get_banner_discount/:img", controllers.get_banner_discount);
api.post("/create_discount_admin", [validateJWT, validateROLE, path], controllers.create_discount_admin);
api.get("/read_discounts_admin/:filter?", [validateJWT, validateROLE], controllers.read_discounts_admin);
api.get("/read_discount_by_id/:id", [validateJWT, validateROLE], controllers.read_discount_by_id);
api.put("/update_discount_admin/:id", [validateJWT, validateROLE, path], controllers.update_discount_admin);
api.delete("/delete_discount_admin/:id", [validateJWT, validateROLE, path], controllers.delete_discount_admin);

api.get("/get_discount_active", controllers.get_discount_active);
module.exports = api;
