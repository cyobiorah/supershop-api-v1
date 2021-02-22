const mongoose = require("./mongoose.service").mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String },
  email: { type: String },
  lastname: { type: String },
  phone: { type: String },
  password: { type: String },
  permissionLevel: { type: Number },
  createdAt: { type: Date, default: Date.now },
  shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shops", sparse: true }],
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtual: true,
});
userSchema.method("toJSON", function () {
  var user = this.toObject();
  delete user.password;
  return user;
});

const shopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  logoUrl: { type: String },
  shopadmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  shopsuperadmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

shopSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
shopSchema.set("toJSON", {
  virtual: true,
});

const User = mongoose.model("Users", userSchema);
const Shop = mongoose.model("Shops", shopSchema);

module.exports = { User, Shop };
