"use strict";
const { response } = require("express");
const Cart = require("../models/cart");

const add_cart_customer = async (req, res = response) => {
  let data = req.body;
  let cart_client = await Cart.find({ customer: data.customer, product: data.product });

  if (cart_client.length == 0) {
    let reg = await Cart.create(data);
    res.status(200).send({ data: reg });
  } else if (cart_client.length >= 1) {
    res.status(200).send({ data: undefined });
  }
};

const get_cart_customer = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Cart.find({ customer: id }).populate("product");
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const delete_item_cart = async (req, res = response) => {
  let id = req.params["id"];
  try {
    let reg = await Cart.findByIdAndRemove({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

module.exports = {
  add_cart_customer,
  get_cart_customer,
  delete_item_cart,
};
