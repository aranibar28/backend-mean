"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/coupon");

var api = express.Router();

api.get("/list_coupons/:filter?", [validateJWT, validateROLE], controllers.list_coupons);
api.get("/list_coupon_by_id/:id", [validateJWT, validateROLE], controllers.list_coupon_by_id);
api.post("/register_coupon", [validateJWT, validateROLE], controllers.register_coupon);
api.put("/update_coupon/:id", [validateJWT, validateROLE], controllers.update_coupon);
api.delete("/delete_coupon/:id", [validateJWT, validateROLE], controllers.delete_coupon);

module.exports = api;
