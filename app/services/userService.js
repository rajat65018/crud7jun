const userModel = require("../models/userModel");

const userService = {};

userService.createUser = async (payload) => {
  return await new userModel(payload).save();
};

userService.findOneUser = async (searchQuery, projectionQuery) => {
  return await userModel.findOne(searchQuery, projectionQuery);
};

userService.findOneUserAndUpdate = async (searchQuery, updateQuery) => {
  return await userModel.findOneAndUpdate(searchQuery, updateQuery);
};

module.exports = userService;
