const ShopModel = require("../model/shops.model");

exports.insert = (req, res) => {
  ShopModel.findByName(req.body.name).then((shop) => {
    if (shop[0]) {
      res.status(404).send({
        success: false,
        message: "Shop name already exists!",
      });
    } else {
      ShopModel.createShop(req.body).then((result) => {
        res.status(201).send({
          success: true,
          data: result,
          message: "Shop Created Successfully!",
        });
      });
    }
  });
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 100;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  ShopModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  ShopModel.findById(req.params.shopId).then((result) => {
    res.status(200).send(result);
  });
};

exports.updateShop = (req, res) => {
  ShopModel.updateShop(req.params.shopId, req.body).then((result) => {
    res.status(204).send({
      success: true,
      data: result,
      message: "Shop Updated Successfully",
    });
  });
};

exports.removeShop = (req, res) => {
  ShopModel.removeShop(req.params.shopId).then((result) => {
    res.status(204).send();
  });
};
