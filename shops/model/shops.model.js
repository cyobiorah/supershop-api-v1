const Shop = require("../../common/services/schema.service").Shop;
const User = require("../../common/services/schema.service").User;

exports.findByName = (param) => {
  return Shop.find({ name: param });
};

exports.findById = (id) => {
  return Shop.findById(id)
    .then((result) => {
      if (!result) return null;
      else {
        delete result.__v;
        return result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createShop = (shopData) => {
  const adminId = shopData.shopsuperadmin;
  return new Promise((resolve, reject) => {
    const shop = new Shop(shopData);
    shop.save().then((result) => {
      if (!result) reject();
      else {
        User.findByIdAndUpdate(
          adminId,
          { $push: { shops: result } },
          { useFindAndModify: false },
          function (err, update) {
            if (err) reject(err);
            resolve(result);
          }
        );
      }
    });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Shop.find()
      .populate("shopadmins", "-__v")
      .populate("shopsuperadmin", "-__v")
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, shops) {
        if (err) reject(err);
        else resolve(shops);
      });
  });
};

exports.updateShop = (id, shopData) => {
  return new Promise((resolve, reject) => {
    Shop.findById(id, function (err, shop) {
      if (err) reject(err);
      for (let i in shopData) shop[i] = shopData[i];
      shop.save(function (err, updatedShop) {
        if (err) return reject(err);
        resolve(updatedShop);
      });
    });
  });
};

exports.updateShopAdmin = (shopId, userId) => {
  return new Promise((resolve, reject) => {
    Shop.findById(shopId, function (err, shop) {
      if (err) reject(err);
      console.log(shop);
      if (shop.shopadmins.length > 1)
        return { success: false, error: "Maximum number of shops allowd" };
      else {
        shop.shopadmins.push(userId);
        shop.save(function (err, updatedShop) {
          if (err) return reject(err);
          resolve(updatedShop);
        });
      }
    });
  });
};

exports.deleteShop = (id, adminId) => {
  console.log(id);
  console.log(adminId);
  return new Promise((resolve, reject) => {
    Shop.deleteOne({ _id: id }, (err) => {
      if (err) reject(err);
      else {
        User.findByIdAndUpdate(
          adminId,
          { $pull: { shops: id } },
          { useFindAndModify: false },
          function (err, update) {
            if (err) reject(err);
            resolve(update);
          }
        );
      }
    });
  });
};
