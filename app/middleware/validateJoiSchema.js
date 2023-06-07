const Joi = require("joi");
function validateJoiSchema(schema) {
  return (req, res, next) => {
    if (schema.body) {
      const result = Joi.object(schema.body).validate(req.body);
      if (result.error) {
        return res.json({ message: result.error.message });
      }
    }
    if (schema.headers) {
      const result = Joi.object(schema.headers)
        .unknown(true)
        .validate(req.headers);
      if (result.error) {
        return res.json({ message: result.error.message });
      }
    }

    next();
  };
}

module.exports = validateJoiSchema;
