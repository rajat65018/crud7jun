const mongoose = require("mongoose");
const { DATABASEURL } = require("../../config");
async function dbConnect() {
  await mongoose.connect(DATABASEURL);
  console.log("database connected successfully");
}
module.exports = dbConnect;
