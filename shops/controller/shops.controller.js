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
    res.status(200).send({
      success: true,
      data: result,
      message: "Shops fetched successfully",
    });
  });
};

exports.getById = (req, res) => {
  ShopModel.findById(req.params.shopId).then((result) => {
    if (result === null)
      res.status(400).send({ success: false, message: "No Shop Found!" });
    else res.status(200).send(result);
  });
};

exports.getShopsByAdminId = (req, res) => {
  ShopModel.getSAdminShops(req.params.adminId).then((result) => {
    if (result === null)
      res
        .status(400)
        .send({
          success: true,
          data: result,
          message: "Admin shops fetched successfully",
        });
    else res.status(200).send(result);
  });
};

exports.updateShop = (req, res) => {
  ShopModel.updateShop(req.params.shopId, req.body).then((result) => {
    res.status(201).send({
      success: true,
      data: result,
      message: "Shop Updated Successfully",
    });
  });
};

exports.getShopAdmins = (req, res) => {
  ShopModel.getShopAdmins(req.params.shopId).then((result) => {
    res.status(201).send({
      success: true,
      data: result[0],
      message: "Shop Admin fetched Successfully",
    });
  });
};

exports.updateShopAdmin = (req, res) => {
  ShopModel.updateShopAdmin(req.params.shopId, req.body.userId).then(
    (result) => {
      console.log(result);
      res.status(201).send({
        success: true,
        data: result,
        message: "Shop Admin Added",
      });
    }
  );
};

exports.deleteShopAdmin = (req, res) => {
  ShopModel.deleteShopAdmin(req.params.shopId, req.body.userId).then(
    (result) => {
      console.log(result);
      res.status(204).send();
    }
  );
};

exports.removeShop = (req, res) => {
  ShopModel.deleteShop(req.params.shopId, req.body.shopsuperadmin).then(
    (result) => {
      res.status(204).send();
    }
  );
};
