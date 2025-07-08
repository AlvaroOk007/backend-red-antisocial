const Joi = require('joi')

const imageSchema = Joi.object({
  url: Joi.string().required()
    .trim()
    .uri({ scheme: ['http', 'https'] })
    .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
    .messages({
      'any.required': 'La URL es requerida.',
      'string.uriCustomScheme': 'La URL debe ser válida con http o https.',
      'string.pattern.base': 'La URL de la imagen debe terminar en .jpg, .jpeg, .png, .gif o .webp.',
      'string.empty': 'La URL no puede ser vacia.'
    }),
  PostId: Joi.number()
})

module.exports = imageSchema
