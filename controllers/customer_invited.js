"use strict";
const { response } = require("express");
var Customer = require("../models/customer");
var bcrypt = require("bcryptjs");
var jwt = require("../helpers/jwt");

const login_customer = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar Email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).send({ msg: "Email no encontrado" });
    }

    // Verificar Password
    const validPassword = bcrypt.compareSync(password, customer.password);
    if (!validPassword) {
      return res.status(404).send({ msg: "Password no válido" });
    }

    // Generar Token
    const token = jwt.createToken(customer);

    return res.send({ data: customer, token });
  } catch (error) {
    res.status(500).send({ ok: false, msg: "Error inesperado... resvisar logs!" });
  }
};

const register_customer = async (req, res = response) => {
  var data = req.body;
  var customer_arr = [];

  customer_arr = await Customer.find({ email: data.email });

  if (customer_arr.length === 0) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      var reg = await Customer.create(data);
      res.status(200).send({ data: reg });
    } else {
      res.status(400).send({ msg: "No hay una contraseña", data: undefined });
    }
  } else {
    res.status(400).send({ msg: "El correo ya existe en la base de datos.", data: undefined });
  }
};

const update_customer_invited = async (req, res = response) => {
  var id = req.params["id"];
  var customer = await Customer.findById({ _id: id });

  const { password, ...data } = req.body;

  if (customer.password != password) {
    var new_password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    data.password = new_password;
    console.log("CON CONTRASEÑA");
    console.log(new_password);
  } else {
    data.password = password;
    console.log("SIN CONTRASEÑA");
    console.log(password);
  }

  const updateCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
  res.status(200).send({ data: updateCustomer });
};

const list_customer_by_id_invited = async (req, res = response) => {
  var id = req.params.id;
  try {
    var reg = await Customer.findById({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

module.exports = {
  login_customer,
  register_customer,
  update_customer_invited,
  list_customer_by_id_invited,
};
