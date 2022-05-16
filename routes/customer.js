"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var admin = require("../controllers/customer_admin");
var invited = require("../controllers/customer_public");

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

api.post("/register_address_customer", [validateJWT], invited.register_address_customer);
api.get("/list_address_customer/:id", [validateJWT], invited.list_address_customer);
api.put("/change_address_customer/:id/:customer", [validateJWT], invited.change_address_customer);
api.delete("/delete_address_customer/:id", [validateJWT], invited.delete_address_customer);
api.get("/principal_address_customer/:id", [validateJWT], invited.principal_address_customer);
api.post("/send_message_contact", invited.send_message_contact);

api.get("/read_orders_customer/:id", [validateJWT], invited.read_orders_customer);
api.get("/read_orders_by_id/:id", [validateJWT], invited.read_orders_by_id);

api.post("/send_review_product", [validateJWT], invited.send_review_product);
api.get("/read_review_customer/:id", [validateJWT], invited.read_review_customer);
api.get("/read_review_product/:id", invited.read_review_product);

module.exports = api;
