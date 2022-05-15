"use strict";
const { response } = require("express");
var Customer = require("../models/customer");
var Address = require("../models/address");
var Contact = require("../models/contact");
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
  } else {
    data.password = password;
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

const register_address_customer = async (req, res = response) => {
  var data = req.body;
  try {
    if (data.principal) {
      let address = await Address.find({ customer: data.customer });
      address.forEach(async (element) => {
        await Address.findByIdAndUpdate({ _id: element._id }, { principal: false });
      });
    }
    let reg = await Address.create(data);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

const list_address_customer = async (req, res = response) => {
  var id = req.params["id"];
  try {
    let address = await Address.find({ customer: id }).populate("customer").sort({ create_at: -1 });
    res.status(200).send({ data: address });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const change_address_customer = async (req, res = response) => {
  var id = req.params["id"];
  var customer = req.params["customer"];
  try {
    let address = await Address.find({ customer: customer });

    address.forEach(async (element) => {
      await Address.findByIdAndUpdate({ _id: element._id }, { principal: false });
    });

    await Address.findByIdAndUpdate({ _id: id }, { principal: true });

    res.status(200).send({ data: true });
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

const delete_address_customer = async (req, res = response) => {
  var id = req.params["id"];
  var address = await Address.findByIdAndDelete({ _id: id });
  res.status(200).send({ data: address });
};

const principal_address_customer = async (req, res = response) => {
  var id = req.params["id"];
  var address = undefined;
  try {
    address = await Address.findOne({ customer: id, principal: true });
    if (address == undefined) {
      res.status(200).send({ data: undefined });
    } else {
      res.status(200).send({ data: address });
    }
  } catch (error) {
    res.status(400).send({ data: undefined });
  }
};

const send_message_contact = async (req, res = response) => {
  let data = req.body;
  let reg = await Contact.create(data);
  res.status(200).send({ data: reg });
};

module.exports = {
  login_customer,
  register_customer,
  update_customer_invited,
  list_customer_by_id_invited,
  register_address_customer,
  list_address_customer,
  change_address_customer,
  delete_address_customer,
  principal_address_customer,
  send_message_contact,
};
