const Joi = require("joi");
const deleteSchema = {
  headers: {
    authorization: Joi.string().required(),
  },
};
module.exports = deleteSchema;
