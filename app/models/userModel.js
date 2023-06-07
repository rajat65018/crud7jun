const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    profileImage: { type: String, require: true },
    isDeleted: { type: String, default: false },
  },
  { timestamps: true }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
