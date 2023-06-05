const userModel = require("../models/userModel");

const userService={};

userService.createUser=async(payload)=>{
    return await new userModel(payload).save();
}

userService.findOneUser=async(searchQuery,projectionQuery)=>{
    return await userModel.findOne(searchQuery,projectionQuery);
}

module.exports=userService;