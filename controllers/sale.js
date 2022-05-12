"use strict";
const { response } = require("express");
const Sale = require("../models/sale");
const Sale_Detail = require("../models/sale_detail");
const Product = require("../models/product");
const Cart = require("../models/cart");

// Resources for mail
var fs = require("fs");
var handlebars = require("handlebars");
var ejs = require("ejs");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var path = require("path");

const register_sale_customer = async (req, res = response) => {
  var data = req.body;
  var details = data.details;
  var last_sale = await Sale.find().sort({ create_at: -1 });
  var serie;
  var correlative;
  var code_venta;

  if (last_sale.length == 0) {
    serie = "001";
    correlative = "000001";
    code_venta = serie + "-" + correlative;
  } else {
    var last_code = last_sale[0].code;
    var arr_code = last_code.split("-");
    if (arr_code[1] != "999999") {
      var new_correlative = zfill(parseInt(arr_code[1]) + 1, 6);
      code_venta = arr_code[0] + "-" + new_correlative;
    } else if (arr_code[1] == "999999") {
      var new_serie = zfill(parseInt(arr_code[0]) + 1, 3);
      code_venta = new_serie + "-000001";
    }
  }
  data.code = code_venta;
  data.status = "Procesando";
  console.log(data);
  let sale = await Sale.create(data);

  details.forEach(async (element) => {
    element.sale = sale._id;
    await Sale_Detail.create(element);
    let product = await Product.findById({ _id: element.product });
    let new_stock = product.stock - element.quantity;
    // Actualizar stock después de la venta
    await Product.findByIdAndUpdate({ _id: element.product }, { stock: new_stock });
    // Limpiar Carrito después de la venta
    await Cart.deleteOne({ customer: data.customer });
  });
  res.status(200).send({ sale: sale });
};

const send_email_sale_customer = async (req, res = response) => {
  var id = req.params["id"];

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "aranibargerson28@gmail.com",
        pass: "rkzxjmwoqaeupyuq",
      },
    })
  );

  var sale = await Sale.findById({ _id: id }).populate("customer");
  var details = await Sale_Detail.find({ sale: id }).populate("product");

  var cliente = sale.customer.first_name + " " + sale.customer.last_name;
  var _id = sale._id;
  var fecha = new Date(sale.create_at);
  var data = details;
  var subtotal = sale.subtotal;
  var precio_envio = sale.price_delivery;

  readHTMLFile(process.cwd() + "/mail.html", (err, html) => {
    let rest_html = ejs.render(html, { data, cliente, _id, fecha, subtotal, precio_envio });
    var template = handlebars.compile(rest_html);
    var htmlToSend = template({ op: true });
    var mailOptions = {
      from: "aranibargerson28@gmail.com",
      to: sale.customer.email,
      subject: "Gracias por tu compra, Mi Tienda",
      html: htmlToSend,
    };
    res.status(200).send({ data: true });
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

function zfill(number, width) {
  var numberOutput = Math.abs(number);
  var length = number.toString().length;
  var zero = "0";
  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

module.exports = {
  register_sale_customer,
  send_email_sale_customer,
};
