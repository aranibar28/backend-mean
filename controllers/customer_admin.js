"use strict";
const { response } = require("express");
var Customer = require("../models/customer");
var bcrypt = require("bcryptjs");

const list_customers = async (req, res = response) => {
  let type = req.params["type"];
  let filter = req.params["filter"];

  if (type == null || type == "null") {
    let reg = await Customer.find();
    res.status(200).send({ data: reg });
  } else {
    if (type == "first_name") {
      let reg = await Customer.find({ first_name: new RegExp(filter, "i") });
      res.status(200).send({ data: reg });
    } else if (type == "last_name") {
      let reg = await Customer.find({ last_name: new RegExp(filter, "i") });
      res.status(200).send({ data: reg });
    } else if (type == "email") {
      let reg = await Customer.find({ email: new RegExp(filter, "i") });
      res.status(200).send({ data: reg });
    }
  }
};

const register_customer_admin = async (req, res = response) => {
  var data = req.body;
  var customer_arr = [];
  customer_arr = await Customer.find({ email: data.email });
  if (customer_arr.length === 0) {
    data.password = bcrypt.hashSync("123456", bcrypt.genSaltSync());
    let reg = await Customer.create(data);
    res.status(200).send({ data: reg });
  } else {
    res.status(400).send({ msg: "El correo ya existe en la base de datos.", data: undefined });
  }
};

const list_customer_by_id = async (req, res = response) => {
  var id = req.params.id;
  try {
    var reg = await Customer.findById({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const update_customer_admin = async (req, res = response) => {
  var id = req.params.id;
  var customer = await Customer.findById({ _id: id });

  // Excluir email y password en la actualización
  const { email, password, ...campos } = req.body;

  // Validar que existe id del Customer
  if (!customer) {
    return res.status(404).json({
      ok: false,
      msg: "No existe un cliente con este id",
    });
  }

  // Validar que email del Customer sea diferente
  if (customer.email != email) {
    const existEmail = await Customer.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Este correo ya se encuentra registrado.",
      });
    } else {
      campos.email = email;
    }
  }

  // Actualizar Customer
  const updateCustomer = await Customer.findByIdAndUpdate(id, campos, { new: true });
  res.status(200).send({ data: updateCustomer });
};

const delete_customer_admin = async (req, res = response) => {
  var id = req.params.id;
  var reg = await Customer.findByIdAndDelete({ _id: id });
  res.status(200).send({ data: reg });
};

module.exports = {
  list_customers,
  list_customer_by_id,
  register_customer_admin,
  update_customer_admin,
  delete_customer_admin,
};
