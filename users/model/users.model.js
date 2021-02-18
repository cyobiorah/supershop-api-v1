const User = require("../../common/services/schema.service").User;

exports.findByEmail = (email) => {
  return User.find({ email: email });
};

exports.findById = (id) => {
  return User.findById(id)
    .populate("shops", "-__v")
    .exec()
    .then((result) => {
      if (!result) return { success: false, message: "No User Found!" };
      else {
        result = result.toJSON();
        delete result.__v;
        return result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .populate("shops", "-__v")
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
    User.deleteOne({ _id: userId }, (err) => {
      if (err) reject(err);
      else resolve(err);
    });
  });
};
