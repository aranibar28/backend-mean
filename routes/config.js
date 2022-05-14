"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/config");

var api = express.Router();
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/configs" });

api.get("/get_logo/:img", [path], controllers.get_logo);
api.get("/get_config_admin", [validateJWT, validateROLE], controllers.get_config_admin);
api.post("/create_config_admin", [validateJWT, validateROLE], controllers.create_config_admin);
api.put("/update_config_admin/:id", [validateJWT, validateROLE, path], controllers.update_config_admin);

module.exports = api;
