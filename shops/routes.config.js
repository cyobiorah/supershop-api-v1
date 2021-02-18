const ShopsController = require("./controller/shops.controller");
const PermissionMiddleware = require("../common/middlewares/auth.permission");
const ValidationMiddleware = require("../common/middlewares/auth.validation");
const InputsMiddleware = require("../common/middlewares/inputs.middleware");
const config = require("../common/config/env.config");

// const ADMINISTRATOR = config.permissionLevels.ADMINISTRATOR;
// const ADMIN_USER = config.permissionLevels.ADMIN_USER;
const SUPERADMIN_USER = config.permissionLevels.SUPERADMIN_USER;

exports.routesConfig = function (app) {
  app.post("/shops", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(SUPERADMIN_USER),
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
  app.put("/shops/shopadmin/:shopId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(SUPERADMIN_USER),
    InputsMiddleware.hasShopAdminFields,
    ShopsController.updateShopAdmin,
  ]);
  app.delete("/shops/:shopId", [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(SUPERADMIN_USER),
    InputsMiddleware.hasDeleteShopFields,
    ShopsController.removeShop,
  ]);
};
