"use strict";
const { response } = require("express");
const Config = require("../models/config");
var path = require("path");
var fs = require("fs");
var id = "6268375bfcf3993fb92859a3";

const get_logo = async (req, res = response) => {
  var img = req.params["img"];
  fs.stat("./uploads/configs/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/configs/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_config_admin = async (req, res = response) => {
  await Config.create({
    categories: [],
    title: "Createx",
    logo: "logo.png",
    serie: "1001",
    correlative: "1001",
  });
};

const get_config_admin = async (req, res = response) => {
  let reg = await Config.findById(id);
  res.status(200).send({ data: reg });
};

const update_config_admin = async (req, res = response) => {
  let { ...data } = req.body;

  if (req.files) {
    var img_path = req.files.logo.path;
    var name = img_path.split("\\");
    var logo_name = name[2];
    let reg = await Config.findByIdAndUpdate(id, { ...data, categories: JSON.parse(data.categories), logo: logo_name });

    fs.stat("./uploads/configs/" + reg.logo, (err) => {
      if (!err) {
        fs.unlink("./uploads/configs/" + reg.logo, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).send({ data: reg });
  } else {
    let reg = await Config.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  }
};

const get_config_public = async (req, res = response) => {
  let reg = await Config.findById(id);
  res.status(200).send({ data: reg });
};

module.exports = {
  create_config_admin,
  update_config_admin,
  get_config_admin,
  get_config_public,
  get_logo,
};
