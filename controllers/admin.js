"use strict";
const { response } = require("express");
var Admin = require("../models/admin");
var bcrypt = require("bcryptjs");
var jwt = require("../helpers/jwt");

const register_admin = async (req, res = response) => {
  var data = req.body;
  var admin_arr = [];

  admin_arr = await Admin.find({ email: data.email });

  if (admin_arr.length === 0) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      var reg = await Admin.create(data);
      res.status(200).send({ data: reg });
    } else {
      res.status(400).send({ message: "No hay una contraseña", data: undefined });
    }
  } else {
    res.status(400).send({ message: "El correo ya existe en la base de datos", data: undefined });
  }
};

const login_admin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar Email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "Email no encontrado", data: undefined});
    }

    // Verificar Password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).send({ msg: "Password no válido", data: undefined });
    }

    // Generar Token
    const token = jwt.createToken(user);

    return res.send({ data: user, token });
  } catch (error) {
    res.status(500).send({ ok: false, msg: "Error inesperado... resvisar logs!" });
  }
};

module.exports = { register_admin, login_admin };
