const jwtSecret = require("../../common/config/env.config.js").jwt_secret,
  jwt = require("jsonwebtoken");
const UserModel = require("../model/users.model");
const crypto = require("crypto");

exports.login = (req, res) => {
  UserModel.findByEmail(req.body.email).then((_user) => {
    if (_user[0]) {
      const user = _user[0];
      user.__v = undefined;
      let token = jwt.sign(req.body, jwtSecret);
      res.status(200).send({
        success: true,
        data: user,
        token: token,
        message: "Login Successful",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User does not exist",
      });
    }
  });
};

exports.insert = (req, res) => {
  //   console.log(req.body);
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;

  UserModel.findByEmail(req.body.email).then((user) => {
    if (user[0]) {
      res.status(404).send({
        success: false,
        message: "User already exists!",
      });
    } else {
      UserModel.createUser(req.body).then((result) => {
        res.status(201).send({
          success: true,
          data: result,
          message: "User Created Successfully",
        });
      });
    }
  });
};

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  UserModel.patchUser(req.params.userId, req.body).then((user) => {
    res.status(204).send(user);
  });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId).then((result) => {
    res.status(204).send();
  });
};
