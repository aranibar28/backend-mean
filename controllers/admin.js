"use strict";
const { response } = require("express");
var Admin = require("../models/admin");
var Sales = require("../models/sale");
var DSales = require("../models/sale_detail");
var Contact = require("../models/contact");
var bcrypt = require("bcryptjs");
var jwt = require("../helpers/jwt");

const register_admin = async (req, res = response) => {
  var data = req.body;
  var admin_arr = [];

  admin_arr = await Admin.find({ email: data.email });

  if (admin_arr.length == 0) {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      var reg = await Admin.create(data);
      res.status(200).send({ data: reg });
    } else {
      res.status(400).send({ msg: "No hay una contraseña", data: undefined });
    }
  } else {
    res.status(400).send({ msg: "El correo ya existe en la base de datos", data: undefined });
  }
};

const login_admin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar Email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "Email no encontrado", data: undefined });
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

const get_messages_admin = async (req, res = response) => {
  let reg = await Contact.find().sort({ create_at: -1 });
  res.status(200).send({ data: reg });
};

const close_message_admin = async (req, res = response) => {
  let id = req.params["id"];
  let reg = await Contact.findByIdAndUpdate({ _id: id }, { status: "Cerrado" });
  res.status(200).send({ data: reg });
};

const get_sales_admin = async (req, res = response) => {
  let sales = [];
  let from = req.params["from"];
  let to = req.params["to"];

  if (from == "undefined" && to == "undefined") {
    sales = await Sales.find().populate("customer").populate("address").sort({ create_at: -1 });
    res.status(200).send({ data: sales });
  } else {
    let tt_from = Date.parse(new Date(from + "T00:00:00")) / 1000;
    let tt_to = Date.parse(new Date(to + "T00:00:00")) / 1000;
    let tem_sales = await Sales.find().populate("customer").populate("address").sort({ create_at: -1 });

    for (var item of tem_sales) {
      var tt_created = Date.parse(new Date(item.create_at)) / 1000;
      if (tt_created >= tt_from && tt_created <= tt_to) {
        sales.push(item);
      }
    }
    res.status(200).send({ data: sales });
  }
};

// KPI

const kpi_mounth_earnings = async (req, res = response) => {
  var january = 0;
  var february = 0;
  var march = 0;
  var april = 0;
  var may = 0;
  var june = 0;
  var july = 0;
  var august = 0;
  var september = 0;
  var october = 0;
  var november = 0;
  var december = 0;

  var total_earnings = 0;
  var total_earnings_month = 0;
  var count_sales = 0;

  var total_earnings_before_month = 0;
  var count_sales_before_month = 0;

  var reg = await Sales.find();
  let current_date = new Date();
  let current_year = current_date.getFullYear();
  let curremt_month = current_date.getMonth() + 1;

  for (var item of reg) {
    let create_date = new Date(item.create_at);
    let month = create_date.getMonth() + 1;

    if (create_date.getFullYear() == current_year) {
      total_earnings = total_earnings + item.subtotal;

      if ((month = curremt_month)) {
        total_earnings_month = total_earnings_month + item.subtotal;
        count_sales = count_sales + 1;
      }

      if (month == curremt_month - 1) {
        total_earnings_before_month = total_earnings_before_month + item.subtotal;
        count_sales_before_month = count_sales_before_month + 1;
      }

      if (month == 1) {
        january = january + item.subtotal;
      } else if (month == 2) {
        february = february + item.subtotal;
      } else if (month == 3) {
        march = march + item.subtotal;
      } else if (month == 4) {
        april = april + item.subtotal;
      } else if (month == 5) {
        may = may + item.subtotal;
      } else if (month == 6) {
        june = june + item.subtotal;
      } else if (month == 7) {
        july = july + item.subtotal;
      } else if (month == 8) {
        august = august + item.subtotal;
      } else if (month == 9) {
        september = september + item.subtotal;
      } else if (month == 10) {
        october = october + item.subtotal;
      } else if (month == 11) {
        november = november + item.subtotal;
      } else if (month == 12) {
        december = december + item.subtotal;
      }
    }
  }
  res.status(200).send({
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    total_earnings,
    total_earnings_month,
    count_sales,
    total_earnings_before_month,
    count_sales_before_month,
  });
};

module.exports = {
  login_admin,
  register_admin,
  get_messages_admin,
  close_message_admin,
  get_sales_admin,
  kpi_mounth_earnings,
};
