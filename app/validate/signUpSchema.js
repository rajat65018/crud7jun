const Joi = require("joi");
const signUpSchema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
    // filename:Joi.string().required()
  },
  // file:{
  //     upload:{
  //         size:[0,100],
  //         allowedmimes:["image/jpeg","image/jpg","image/png"],
  //     }
  // }
};
module.exports = signUpSchema;
