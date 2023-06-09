const Joi = require("joi");
const signUpSchema = {
  body: {
    name: Joi.string().required().description('user name'),
    email: Joi.string().email().required().description('user email'),
    password: Joi.string().min(5).max(20).required().description('user password')
  },
};
module.exports = signUpSchema;
