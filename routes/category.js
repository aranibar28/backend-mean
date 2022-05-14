"use strict";
var express = require("express");
var { validateJWT, validateROLE } = require("../middlewares/authenticated");
var controllers = require("../controllers/category");

var api = express.Router();
var multiparty = require("connect-multiparty");
var path = multiparty({ uploadDir: "./uploads/categories" });

api.get("/get_banner_category/:img", controllers.get_banner_category);
api.post("/create_category_admin", [validateJWT, validateROLE, path], controllers.create_category_admin);
api.get("/read_category_admin/:filter?", [validateJWT, validateROLE], controllers.read_category_admin);
api.get("/read_category_by_id/:id", [validateJWT, validateROLE], controllers.read_category_by_id);
api.put("/update_category_admin/:id", [validateJWT, validateROLE, path], controllers.update_category_admin);
api.delete("/delete_category_admin/:id", [validateJWT, validateROLE, path], controllers.delete_category_admin);

// Publics
api.get("/read_category_public", controllers.read_category_public);

module.exports = api;
