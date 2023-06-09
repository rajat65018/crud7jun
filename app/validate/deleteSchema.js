const Joi = require("joi");
const deleteSchema = {
  headers: {
    authorization: Joi.string().required().description('User jwt token'),
  },
};
module.exports = deleteSchema;
