"use strict";
var express = require("express");
var { validateJWT } = require("../middlewares/authenticated");
var controllers = require("../controllers/sale");

var api = express.Router();

api.post("/register_sale_customer", [validateJWT], controllers.register_sale_customer);
api.get("/send_email_sale_customer/:id", [validateJWT], controllers.send_email_sale_customer);

module.exports = api;
