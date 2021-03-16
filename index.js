const config = require("./common/config/env.config.js");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// corsOptions = {
//   origin: "http://localhost:3200",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const UsersRouter = require("./users/routes.config");
const ShopsRouter = require("./shops/routes.config");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  next();
});

UsersRouter.routesConfig(app);
ShopsRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});
