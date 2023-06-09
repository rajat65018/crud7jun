const Joi = require("joi");
const changePasswordSchema = {
  body: {
    presentPassword: Joi.string().required().description('user current password'),
    changePassword: Joi.string().min(5).max(20).required().description('user new password'),
  },
  headers: {
    authorization: Joi.string().required().description('user jwt token'),
  },
};
module.exports = changePasswordSchema;
