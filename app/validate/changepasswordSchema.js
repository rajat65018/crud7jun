const Joi = require("joi");
const changePasswordSchema = {
  body: {
    presentPassword: Joi.string().required(),
    changePassword: Joi.string().min(5).max(20).required(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};
module.exports = changePasswordSchema;
