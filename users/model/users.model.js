// const mongoose = require("../../common/services/mongoose.service").mongoose;
// const Schema = mongoose.Schema;
// const userSchema = require("../../users/model/users.model");

const User = require("../../common/services/schema.service").User;
// const userSchema = User.userSchema;

// const userSchema = new Schema({
//   firstname: { type: String, required: true },
//   email: { type: String, required: true },
//   lastname: { type: String, required: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   permissionLevel: { type: Number },
//   createdAt: { type: Date, default: Date.now },
//   shops: { type: mongoose.Schema.Types.ObjectId, ref: "Shops" },
// });

// userSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// userSchema.set("toJSON", {
//   virtual: true,
// });

// userSchema.findById = function (cb) {
//   return this.model("Users").find({ id: this.id }, cb);
// };

// const User = mongoose.model("Users", userSchema);

exports.findByEmail = (email) => {
  return User.find({ email: email });
};

exports.findById = (id) => {
  return User.findOne({ _id: id }).then((result) => {
    if (!result) return null;
    else {
      // console.log(result);
      result = result.toJSON();
      delete result.__v;
      return result;
    }
  });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) reject(err);
        else resolve(users);
      });
  });
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      for (let i in userData) user[i] = userData[i];
      user.save(function (err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, (err) => {
      if (err) reject(err);
      else resolve(err);
    });
  });
};
