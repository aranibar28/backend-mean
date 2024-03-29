"use strict";

var jwt = require("jwt-simple");
var Admin = require("../models/admin");
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

const validateROLE = async (req, res, next) => {
  const id = req.user.sub;
  try {
    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Ususario no encontrado",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para realizar esta acción.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

module.exports = { validateJWT, validateROLE };
