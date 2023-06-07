const Joi = require("joi");
const updateSchema = {
  body: {
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};
module.exports = updateSchema;
