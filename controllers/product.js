"use strict";
const { response } = require("express");
var Product = require("../models/product");
var fs = require("fs");
var path = require("path");

const list_products = async (req, res = response) => {
  if (req.user) {
    if (req.user.role === "admin") {
      let filter = req.params["filter"];
      let reg = await Product.find({ title: new RegExp(filter, "i") });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ msg: "No access" });
    }
  } else {
    res.status(500).send({ msg: "No access" });
  }
};

const register_product = async (req, res = response) => {
  if (req.user) {
    if (req.user.role === "admin") {
      let data = req.body;
      var img_path = req.files.banner.path;
      var name = img_path.split("\\");
      var banner_name = name[2];
      data.slug = data.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      data.banner = banner_name;

      let reg = await Product.create(data);
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ msg: "No access" });
    }
  } else {
    res.status(500).send({ msg: "No access" });
  }
};

const get_banner = async (req, res = response) => {
  var img = req.params["img"];
  fs.stat("./uploads/products/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/products/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

module.exports = { list_products, register_product, get_banner };
