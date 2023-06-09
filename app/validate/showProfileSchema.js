const Joi = require("joi");
const showProfileSchema = {
  headers: {
    authorization: Joi.string().required().description('user jwt token'),
  },
};
module.exports = showProfileSchema;
