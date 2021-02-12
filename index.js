const config = require("./common/config/env.config.js");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const UsersRouter = require("./users/routes.config");
const ShopsRouter = require("./shops/routes.config");

app.use(function (req, res, next) {
  // console.log(req.body);
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

// const config = require("./common/config/env.config");

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const UsersRouter = require("./users/routes.config");

// app.use(function (req, res, next) {
//   // console.log(req.body);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//   res.header("Access-Control-Expose-Headers", "Content-Length");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Accept, Authorization, Content-Type, X-Requested-With, Range"
//   );
//   next();
// });

// UsersRouter.routesConfig(app);

// app.listen(config.port, function () {
//   console.log(`Server is running on port ${config.port}.`);
// });
