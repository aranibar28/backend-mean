"use strict";
var jwt = require("jsonwebtoken");
var moment = require("moment");
var secret = "aranibar";

exports.createToken = (user) => {
  var payload = {
    sub: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(7, "days").unix(),
  };
  return jwt.sign(payload, secret);
};
