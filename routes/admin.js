"use strict";
var express = require("express");
var controllers = require("../controllers/admin");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");

var api = express.Router();

api.post("/register_admin", controllers.register_admin);
api.post("/login_admin", controllers.login_admin);
api.get("/get_messages_admin", [validateJWT, validateROLE], controllers.get_messages_admin);
api.put("/close_message_admin/:id", [validateJWT, validateROLE], controllers.close_message_admin);

module.exports = api;
