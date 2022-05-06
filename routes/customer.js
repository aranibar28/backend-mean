"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var admin = require("../controllers/customer_admin");
var invited = require("../controllers/customer_invited");

var api = express.Router();

api.get("/list_customers/:type/:filter?", [validateJWT, validateROLE], admin.list_customers);
api.get("/list_customer_by_id/:id", [validateJWT, validateROLE], admin.list_customer_by_id);
api.post("/register_customer_admin", [validateJWT, validateROLE], admin.register_customer_admin);
api.put("/update_customer_admin/:id", [validateJWT, validateROLE], admin.update_customer_admin);
api.delete("/delete_customer_admin/:id", [validateJWT, validateROLE], admin.delete_customer_admin);

api.post("/login_customer", invited.login_customer);
api.post("/register_customer", invited.register_customer);
api.put("/update_customer_invited/:id", [validateJWT], invited.update_customer_invited);
api.get("/list_customer_by_id_invited/:id", [validateJWT], invited.list_customer_by_id_invited);
module.exports = api;
