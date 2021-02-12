// const mongoose = require("../../common/services/mongoose.service").mongoose;
// const Schema = mongoose.Schema;
// const userSchema = require("../../users/model/users.model");
const Shop = require("../../common/services/schema.service").Shop;
const userSchema = require("../../common/services/schema.service").User;
const User = require("../../users/model/users.model");
// const User = mongoose.model("Users", userSchema);

// const shopsSchema = new Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   logoUrl: { type: String },
//   shopadmin: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users",
//     required: true,
//   },
// });

// Shop.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// Shop.set("toJson", {
//   virtual: true,
// });

// Shop.findById = function (cb) {
//   return this.model("Shops").find({ id: this.id }, cb);
// };

// const Shop = mongoose.model("Shops", shopsSchema);

exports.findByName = (param) => {
  return Shop.find({ name: param });
};

exports.findById = (id) => {
  return Shop.findById(id)
    .then((result) => {
      if (!result) return { error: "No Shop Found!" };
      else {
        result = result.toJson();
        delete result.__v;
        return result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createShop = (shopData) => {
  //   console.log(shopData);
  const adminId = shopData.shopadmin;
  console.log(adminId);
  return new Promise((resolve, reject) => {
    console.log("here");
    console.log(adminId);
    const shop = new Shop(shopData);
    shop.save().then((result) => {
      if (!result) reject();
      else {
        console.log("there");
        console.log(result);
        userSchema.findByIdAndUpdate(
          adminId,
          { $push: { shops: result } },
          { useFindAndModify: false },
          function (err, update) {
            console.log("where");
            if (err) reject(err);
            console.log(update);
            resolve(result);
          }
        );
      }
    });
    // User.findById(shopData.shopadmin).then((user) => {
    //   //   console.log(user);
    //   if (!user || user === null) {
    //     return reject({ error: "Invalid User!" });
    //   } else {
    //     const shop = new Shop(shopData);
    //     shop.save().then((result) => {
    //       if (!result) reject();
    //       else {
    //         console.log(result);
    //         console.log("there");
    //         const updatetedUser = new userSchema(user);
    //         console.log("here");
    //         console.log(updatetedUser);
    //         if (!updatetedUser.stores) {
    //           updatetedUser.stores = [];
    //           updatetedUser.stores.push(result._id);
    //           //   updatetedUser.updateOne(
    //           //     { email: updatetedUser.email },
    //           //     { $set: { shops: result } },
    //           //     { upsert: true },
    //           //     function (err, result) {
    //           //       if (err) reject(err);
    //           //       else console.log(result);
    //           //     }
    //           //   );
    //         } else {
    //           //   updatetedUser.updateOne(
    //           //     { email: updatetedUser.email },
    //           //     { $set: { shops: result } },
    //           //     { upsert: true },
    //           //     function (err, result) {
    //           //       if (err) reject(err);
    //           //       else console.log(result);
    //           //     }
    //           //   );
    //           updatetedUser.stores.push(result);
    //         }
    //         updatetedUser.save();
    //         resolve(result);
    //         // updatetedUser.save(function (err, newUpdate) {
    //         //   if (err) reject(err);
    //         //   console.log(newUpdate);
    //         // });
    //         // user.shops.push(result);
    //         // user.save();
    //       }
    //     });
    //   }
    // });
    // User.findById(shopData.shopadmin).then((user) => {
    //   console.log(user);
    //   if (!user) reject({ error: "Invalid user" });
    //   else {
    //     const shop = new Shop(shopData);
    //     shop.save(function (err, shop) {
    //       if (err) return reject(err);
    //       //   user = new User();
    //       user.shops.push(shop);
    //     //   user.save();
    //       resolve(shop);
    //     });
    //   }
    // });
    // User.findById(shopData.shopadmin, function (err, user) {
    //   console.log(user);
    //   if (err) reject(err);
    //   else {
    //     const shop = new Shop(shopData);
    //     shop.save(function (err, shop) {
    //       if (err) return reject(err);
    //       user.shops.push(shop);
    //       user.save();
    //       resolve(shop);
    //     });
    //   }
    // });
    // User.findById(shopData.shopadmin, function (err, user) {
    //   console.log(user);
    // });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Shop.find()
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

exports.deleteShop = (id) => {
  return new Promise((resolve, reject) => {
    Shop.remove({ _id: id }, (err) => {
      if (err) reject(err);
      else resolve(err);
    });
  });
};
