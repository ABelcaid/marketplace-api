const Joi = require("joi");

exports.inputValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(14).required(),
  password: Joi.string().min(3).required(),
  address: Joi.string().required(),

})