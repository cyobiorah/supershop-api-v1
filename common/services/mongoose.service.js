const mongoose = require("mongoose");
require("dotenv").config();
let count = 0;

const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(process.env.MONGODB_URI, options)
    // .connect(process.env.MONGODB_URI, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds... ",
        ++count
      );
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
