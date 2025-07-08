const Joi = require('joi')

const postTagSchema = Joi.object({
  PostId: Joi.number().integer().required(),
  TagId: Joi.number().integer().required()
})

module.exports = postTagSchema
