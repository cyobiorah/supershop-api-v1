exports.hasSignupFields = (req, res, next) => {
  let errors = [];
  if (!req.body.firstname) errors.push("Firstname required");
  if (!req.body.lastname) errors.push("Lastname required");
  if (!req.body.email) errors.push("Email required");
  if (!req.body.password) errors.push("Password required");
  if (!req.body.phone) errors.push("Phone required");
  if (errors.length) {
    return res.status(400).send({
      success: false,
      message: errors.join(", "),
    });
  } else return next();
};

exports.hasLoginFields = (req, res, next) => {
  let errors = [];
  if (!req.body.email) errors.push("Email required");
  if (!req.body.password) errors.push("Password required");
  if (errors.length) {
    return res.status(400).send({
      success: false,
      message: errors.join(", "),
    });
  } else return next();
};

exports.hasShopFields = (req, res, next) => {
  let errors = [];
  if (!req.body.name) errors.push("Shop name is required");
  if (!req.body.address) errors.push("Address is required");
  if (!req.body.phone) errors.push("Phone is required");
  if (!req.body.shopadmin) errors.push("Shop admin ID is required");
  if (errors.length) {
    return res.status(400).send({
      success: false,
      message: errors.join(", "),
    });
  } else return next();
};
