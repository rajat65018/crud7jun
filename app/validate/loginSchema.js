const Joi = require("joi");
const loginSchema = {
  email: Joi.string().email().required().description('user email'),
  password: Joi.string().min(5).max(10).required().description('user password'),
};
module.exports = loginSchema;
