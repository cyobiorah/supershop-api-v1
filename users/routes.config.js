const UsersController = require("./controller/users.controller");
const InputsMiddleware = require("../common/middlewares/inputs.middleware");
const ValidationMiddleware = require("../common/middlewares/auth.validation");
const PermissionMiddleware = require("../common/middlewares/auth.permission");
const config = require("../common/config/env.config");

const ADMINISTRATOR = config.permissionLevels.ADMINISTRATOR;
const SUPERADMIN_USER = config.permissionLevels.SUPERADMIN_USER;
const ADMIN_USER = config.permissionLevels.ADMIN_USER;

exports.routesConfig = function (app) {
  app.post("/auth", [
    InputsMiddleware.hasLoginFields,
    PermissionMiddleware.isPasswordAndUserMatch,
    UsersController.login,
  ]);
  app.post("/users", [
    InputsMiddleware.hasSignupFields,
    UsersController.insert,
  ]);
  app.get("/users", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN_USER),
    UsersController.list,
  ]);
  app.get("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdmin,
    UsersController.getById,
  ]);
  app.put("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdmin,
    UsersController.patchById,
  ]);
  app.delete("/users/:userId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN_USER),
    UsersController.removeById,
  ]);
};
