"use strict";
var express = require("express");
var { validateJWT } = require("../middlewares/authenticated");
var controllers = require("../controllers/customer");

var api = express.Router();

api.post("/register_customer", controllers.register_customer);
api.post("/login_customer", controllers.login_customer);

api.get("/list_customers/:type/:filter?", [validateJWT], controllers.list_customers);
api.get("/list_customer_by_id/:id", [validateJWT], controllers.list_customer_by_id);
api.post("/register_customer_admin", [validateJWT], controllers.register_customer_admin);
api.put("/update_customer_admin/:id", [validateJWT], controllers.update_customer_admin);
api.delete("/delete_customer_admin/:id", [validateJWT], controllers.delete_customer_admin);

module.exports = api;
