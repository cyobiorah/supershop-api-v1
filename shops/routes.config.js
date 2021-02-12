const ShopsController = require("./controller/shops.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission");
const ValidationMiddleware = require("../common/middlewares/auth.validation");
const InputsMiddleware = require("../common/middlewares/inputs.middleware");
const config = require("../common/config/env.config");

const ADMINISTRATOR = config.permissionLevels.ADMINISTRATOR;
const SUPERADMIN_USER = config.permissionLevels.SUPERADMIN_USER;
const ADMIN_USER = config.permissionLevels.ADMIN_USER;

exports.routesConfig = function (app) {
  app.post("/shops", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN_USER),
    InputsMiddleware.hasShopFields,
    ShopsController.insert,
  ]);
  app.get("/shops", [ShopsController.list]);
  app.get("/shops/:shopId", [ShopsController.getById]);
  app.put("/shops/:shopId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(SUPERADMIN_USER),
    ShopsController.updateShop,
  ]);
  app.delete("/shops/:shopId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(SUPERADMIN_USER),
    ShopsController.removeShop,
  ]);
};
