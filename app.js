"use strict";

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var server = require("http").createServer(app);
var io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("insert-item-cart", (data) => {
    io.emit("new-item-cart", data);
  });
  socket.on("delete-item-cart", (data) => {
    io.emit("update-item-cart", data);
  });
  socket.on("login", (data) => {
    io.emit("new-login", data);
  });
});

var admin_route = require("./routes/admin");
var customer_route = require("./routes/customer");
var product_route = require("./routes/product");
var coupon_route = require("./routes/coupon");
var config_route = require("./routes/config");
var cart_route = require("./routes/cart");

mongoose.connect("mongodb://127.0.0.1:27017/tienda", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    server.listen(port, () => console.log("Servidor corriendo en el puerto: " + port));
  }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

// Configurar CORS
app.use(cors());

app.use("/api", admin_route);
app.use("/api", customer_route);
app.use("/api", product_route);
app.use("/api", coupon_route);
app.use("/api", config_route);
app.use("/api", cart_route);

module.exports = app;
