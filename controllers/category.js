"use strict";
const { response } = require("express");
const Category = require("../models/category");
var path = require("path");
var fs = require("fs");

//! https:/localhost:3000/api/get_banner_category/defult.png
const get_banner_category = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/categories/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/categories/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_category_admin = async (req, res = response) => {
  let data = req.body;
  var img_path = req.files.banner.path;
  var name = img_path.split("\\");
  var banner_name = name[2];
  data.banner = banner_name;
  let reg = await Category.create(data);
  res.status(200).send({ data: reg });
};

const read_category_public = async (req, res = response) => {
  let reg = await Category.find();
  res.status(200).send({ data: reg });
};

const read_category_admin = async (req, res = response) => {
  let filter = req.params["filter"];
  let reg = await Category.find({ title: new RegExp(filter, "i") });
  res.status(200).send({ data: reg });
};

const read_category_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Category.findById(id);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const update_category_admin = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  if (req.files) {
    var img_path = req.files.banner.path;
    var name = img_path.split("\\");
    var banner = name[2];
    let reg = await Category.findByIdAndUpdate(id, { ...data, banner });
    fs.stat("./uploads/categories/" + reg.banner, (err) => {
      if (!err) {
        fs.unlink("./uploads/categories/" + reg.banner, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).send({ data: reg });
  } else {
    let reg = await Category.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  }
};

const delete_category_admin = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Category.findByIdAndDelete(id);

  fs.stat("./uploads/categories/" + reg.banner, (err) => {
    if (!err) {
      fs.unlink("./uploads/categories/" + reg.banner, (err) => {
        if (err) throw err;
      });
    }
  });
  res.status(200).send({ data: reg });
};

module.exports = {
  get_banner_category,
  create_category_admin,
  read_category_public,
  read_category_admin,
  read_category_by_id,
  update_category_admin,
  delete_category_admin,
};
