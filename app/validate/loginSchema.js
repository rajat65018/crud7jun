const Joi = require("joi");
const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(10).required(),
};
module.exports = loginSchema;
