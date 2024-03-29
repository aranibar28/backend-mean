"use strict";
const { response } = require("express");
const Product = require("../models/product");
const Inventory = require("../models/inventory");
const Reviews = require("../models/review");
var path = require("path");
var fs = require("fs");

const get_banner = async (req, res = response) => {
  var img = req.params["img"];
  fs.stat("./uploads/products/" + img, (err) => {
    if (!err) {
      let path_img = "./uploads/products/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const list_products = async (req, res = response) => {
  let filter = req.params["filter"];
  let reg = await Product.find({ title: new RegExp(filter, "i") }).sort({ create_at: -1 });
  res.status(200).send({ data: reg });
};

const list_product_by_id = async (req, res = response) => {
  let id = req.params["id"];
  try {
    var reg = await Product.findById(id);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_by_slug = async (req, res = response) => {
  let slug = req.params["slug"];
  try {
    var reg = await Product.findOne({ slug });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_recomended = async (req, res = response) => {
  let category = req.params["category"];
  try {
    var reg = await Product.find({ category }).sort({ create_at: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_news = async (req, res = response) => {
  try {
    var reg = await Product.find().sort({ create_at: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_product_sales = async (req, res = response) => {
  try {
    var reg = await Product.find().sort({ num_sales: -1 }).limit(9);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(200).send({ data: undefined });
  }
};

const list_reviews_public = async (req, res = response) => {
  let id = req.params["id"];
  let reviews = await Reviews.find({ product: id }).sort({ create_at: -1 }).populate("customer");
  res.status(200).send({ data: reviews });
};

const register_product = async (req, res = response) => {
  let data = req.body;
  var img_path = req.files.banner.path;
  var name = img_path.split("\\");
  var banner_name = name[2];

  data.slug = data.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  data.banner = banner_name;

  let reg = await Product.create(data);
  let inventory = await Inventory.create({
    admin: req.user.sub,
    quantity: data.stock,
    supplier: "Primer Registro",
    product: reg._id,
  });

  res.status(200).send({ data: reg, inventory });
};

const update_product = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  if (req.files) {
    var img_path = req.files.banner.path;
    var name = img_path.split("\\");
    var banner_name = name[2];

    let reg = await Product.findByIdAndUpdate(id, { ...data, banner: banner_name });

    fs.stat("./uploads/products/" + reg.banner, (err) => {
      if (!err) {
        fs.unlink("./uploads/products/" + reg.banner, (err) => {
          if (err) throw err;
        });
      }
    });
    res.status(200).send({ data: reg });
  } else {
    let reg = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ data: reg });
  }
};

const update_product_variety = async (req, res = response) => {
  let id = req.params["id"];
  let { ...data } = req.body;

  let reg = await Product.findByIdAndUpdate(id, { ...data, name_variety: data.name_variety, item_variety: data.item_variety });
  res.status(200).send({ data: reg });
};

const update_product_galery = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;

  var img_path = req.files.image.path;
  var name = img_path.split("\\");
  var image_name = name[2];

  let reg = await Product.findByIdAndUpdate(id, {
    $push: {
      galery: {
        image: image_name,
        _id: data._id,
      },
    },
  });

  res.status(200).send({ data: reg });
};

const delete_product_galery = async (req, res = response) => {
  let id = req.params["id"];
  let data = req.body;

  let reg = await Product.findByIdAndUpdate(id, {
    $pull: {
      galery: { _id: data._id },
    },
  });

  res.status(200).send({ data: reg });
};

const delete_product = async (req, res = response) => {
  var id = req.params.id;
  var reg = await Product.findByIdAndDelete(id);
  res.status(200).send({ data: reg });
};

const list_inventory_product = async (req, res = response) => {
  var id = req.params["id"];
  var reg = await Inventory.find({ product: id }).populate("admin").sort({ create_at: -1 });
  res.status(200).send({ data: reg });
};

const delete_inventory_product = async (req, res = response) => {
  // Eliminar Inventario mediante su ID
  var id = req.params["id"];
  let reg = await Inventory.findOneAndRemove({ _id: id });

  // Obtener registro del Producto
  let prod = await Product.findById({ _id: reg.product });

  // Calcular el nuevo stock
  let new_stock = parseInt(prod.stock) - parseInt(reg.quantity);

  // Actualización del nuevo stock del Producto
  let product = await Product.findOneAndUpdate({ _id: reg.product }, { stock: new_stock });
  res.status(200).send({ data: product });
};

const register_inventory_product = async (req, res = response) => {
  let data = req.body;
  let reg = await Inventory.create(data);

  // Obtener registro del Producto
  let prod = await Product.findById({ _id: reg.product });

  // Calcular el stock actual + stock aumentado
  let new_stock = parseInt(prod.stock) + parseInt(reg.quantity);

  // TODO: Actualización del nuevo stock del Producto
  let product = await Product.findOneAndUpdate({ _id: reg.product }, { stock: new_stock });

  res.status(200).send({ data: product });
};

module.exports = {
  list_products,
  list_product_by_id,
  list_product_by_slug,
  list_product_recomended,
  list_product_news,
  list_product_sales,
  list_reviews_public,
  register_product,
  get_banner,
  update_product,
  update_product_variety,
  update_product_galery,
  delete_product_galery,
  delete_product,
  list_inventory_product,
  delete_inventory_product,
  register_inventory_product,
};
