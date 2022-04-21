"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "aranibar";

const validateJWT = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ msg: "No se proveeron token" });
  }

  var token = req.headers.token.replace(/['"]+/g, "");
  var segment = token.split(".");

  if (segment.length != 3) {
    return res.status(403).send({ msg: "Invalid token" });
  } else {
    try {
      var payload = jwt.decode(token, secret);
      if (payload.exp <= moment.unix()) {
        return res.status(403).send({ msg: "Token expirado" });
      }
    } catch (error) {
      return res.status(403).send({ msg: "Invalid token" });
    }
  }
  req.user = payload;
  next();
};

module.exports = { validateJWT };
