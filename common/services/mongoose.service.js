const mongoose = require("mongoose");
require("dotenv").config();
let count = 0;

const uri =
  "mongodb+srv://cyriltechlist:cx0iCqSDbT0qmFxY@cluster0.98vqo.mongodb.net/supershop?retryWrites=true&w=majority";

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
    .connect(uri, options)
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
