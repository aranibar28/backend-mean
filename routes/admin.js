"use strict";
var express = require("express");
var adminController = require("../controllers/admin");

var api = express.Router();

api.post("/register_admin", adminController.register_admin);
api.post("/login_admin", adminController.login_admin);

module.exports = api;
