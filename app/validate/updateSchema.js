const Joi = require("joi");
const updateSchema = {
  body: {
    name: Joi.string().optional().description('user name'),
    email: Joi.string().email().optional().description('user email'),
  },
  headers: {
    authorization: Joi.string().required().description('user jwt token'),
  },
};
module.exports = updateSchema;
