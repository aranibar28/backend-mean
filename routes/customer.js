"use strict";
var express = require("express");
var customerController = require("../controllers/customer");
var auth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/register_customer", customerController.register_customer);
api.post("/login_customer", customerController.login_customer);

api.get("/list_customers/:type/:filter?", auth.auth, customerController.list_customers);
api.post("/register_customer_admin", auth.auth, customerController.register_customer_admin);
api.get("/list_customer_by_id/:id", auth.auth, customerController.list_customer_by_id);
api.put("/update_customer_admin/:id", auth.auth, customerController.update_customer_admin);
api.delete("/delete_customer_admin/:id", auth.auth, customerController.delete_customer_admin);

module.exports = api;
