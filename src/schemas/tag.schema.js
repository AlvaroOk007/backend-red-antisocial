const Joi = require('joi')

const tagSchema = Joi.object({
  description: Joi.string().required().min(3).max(50).messages({
    'any.required': 'La descripcion del tag es obligatoria',
    'string.min': 'La etiqueta debe tener {#limit} caracteres como minimo',
    'string.max': 'La etiqueta debe tener {#limit} caracteres como maximo',
    'string.base': 'La etiqueta tiene que ser un string'
  })

})

module.exports = tagSchema
