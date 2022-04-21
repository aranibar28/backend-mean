"use strict";
var express = require("express");
var controllers = require("../controllers/admin");
var auth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/register_admin", controllers.register_admin);
api.post("/login_admin", controllers.login_admin);

module.exports = api;
