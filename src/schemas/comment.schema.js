const Joi = require('joi')

const schema = Joi.object({
  content: Joi.string().required().trim().min(1).max(60).messages({
    'any.required': 'es obligatorio ingresar un comentario',
    'string.min': 'el comentario debe contener al menos {#limit} caracter',
    'string.max': 'el comentario puede tener como máximo {#limit} caracteres',
    'string.empty': 'el contenido no puede ser vacio'
  }),
  UserId: Joi.number(),
  PostId: Joi.number()
})

module.exports = schema
