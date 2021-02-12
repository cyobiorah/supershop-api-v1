const crypto = require("crypto");
const UserModel = require("../../users/model/users.model");

const ADMIN_PERMISSION = 4096;

exports.isPasswordAndUserMatch = (req, res, next) => {
  UserModel.findByEmail(req.body.email).then((user) => {
    if (!user[0]) {
      res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    } else {
      let passwordFields = user[0].password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          firstname: user[0].firstName,
          lastname: user[0].lastName,
        };
        return next();
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
    }
  });
};

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    if (user_permission_level & required_permission_level) return next();
    else {
      return res.status(403).send({
        success: false,
        message: "Not authorized to carry out this operation",
      });
    }
  };
};

exports.onlySameUserOrAdmin = (req, res, next) => {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId)
    return next();
  else {
    if (user_permission_level && ADMIN_PERMISSION) return next();
    else {
      return res.status(403).send({
        success: false,
        message: "Admin or same user action",
      });
    }
  }
};

exports.sameUserCannot = (req, res, next) => {
  let userId = req.jwt.userId;
  if (req.params.userId !== userId) return next();
  else return res.status(400).send();
};
