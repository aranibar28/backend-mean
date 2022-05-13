"use strict";
const { response } = require("express");
const Discount = require("../models/discount");
var path = require("path");
var fs = require("fs");

//! https:/localhost:3000/api/get_banner_discount/defult.png
const get_banner_discount = async (req, res = response) => {
  let img = req.params["img"];
  fs.stat("./uploads/discounts/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/discounts/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const create_discount_admin = async (req, res = response) => {
  let data = req.body;
  var img_path = req.files.banner.path;
  var name = img_path.split("\\");
  var banner_name = name[2];
  data.banner = banner_name;
  let reg = await Discount.create(data);
  res.status(200).send({ data: reg });
};

const read_discounts_admin = async (req, res = response) => {
  let filter = req.params["filter"];
  let reg = await Discount.find({ title: new RegExp(filter, "i") }).sort({ create_at: -1 });
  res.status(200).send({ data: reg });
};

const read_discount_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Discount.findById(id);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const update_discount_admin = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  if (req.files) {
    var img_path = req.files.banner.path;
    var name = img_path.split("\\");
    var banner = name[2];
    let reg = await Discount.findByIdAndUpdate(id, { ...data, banner });
    fs.stat("./uploads/discounts/" + reg.banner, (err) => {
      if (!err) {
        fs.unlink("./uploads/discounts/" + reg.banner, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).send({ data: reg });
  } else {
    let reg = await Discount.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  }
};

const delete_discount_admin = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Discount.findByIdAndDelete(id);

  fs.stat("./uploads/discounts/" + reg.banner, (err) => {
    if (!err) {
      fs.unlink("./uploads/discounts/" + reg.banner, (err) => {
        if (err) throw err;
      });
    }
  });
  res.status(200).send({ data: reg });
};

const get_discount_active = async (req, res = response) => {
  let discounts = Discount.find().sort({ create_at: -1 });
  var today = Date.parse(new Date().toString()) / 1000;
  var array = [];

  (await discounts).forEach((element) => {
    var start = Date.parse(element.start_date + "T00:00:00") / 1000;
    var finish = Date.parse(element.finish_date + "T23:59:59") / 1000;
    if (today >= start && today <= finish) {
      array.push(element);
    }
  });
  if (array.length >= 1) {
    res.status(200).send({ data: array });
  } else {
    res.status(200).send({ data: undefined });
  }
};

module.exports = {
  get_banner_discount,
  create_discount_admin,
  read_discounts_admin,
  read_discount_by_id,
  update_discount_admin,
  delete_discount_admin,
  get_discount_active,
};
