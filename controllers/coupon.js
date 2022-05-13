"use strict";
const { response } = require("express");
const Coupon = require("../models/coupon");

const list_coupons = async (req, res = response) => {
  let filter = req.params["filter"];
  try {
    let reg = await Coupon.find({ code: new RegExp(filter, "i") }).sort({ create_at: -1 });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(404).send({ data: undefined });
  }
};

const list_coupon_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Coupon.findById(id);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(404).send({ data: undefined });
  }
};

const register_coupon = async (req, res = response) => {
  let data = req.body;
  try {
    let reg = await Coupon.create(data);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(404).send({ data: undefined });
  }
};

const update_coupon = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;
  try {
    let reg = await Coupon.findByIdAndUpdate(id, data);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(404).send({ data: undefined });
  }
};

const delete_coupon = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Coupon.findByIdAndDelete(id);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(404).send({ data: undefined });
  }
};

const validate_coupon_public = async (req, res = response) => {
  let coupon = req.params["coupon"];
  let data = await Coupon.findOne({ code: coupon });

  if (data) {
    if (data.limit == 0) {
      res.status(200).send({ data: undefined });
    } else {
      res.status(200).send({ data: data });
    }
  } else {
    res.status(200).send({ data: undefined });
  }
};

module.exports = {
  list_coupons,
  list_coupon_by_id,
  register_coupon,
  update_coupon,
  delete_coupon,
  validate_coupon_public,
};
