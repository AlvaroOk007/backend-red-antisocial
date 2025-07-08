const Joi = require('joi')

const userSchema = Joi.object({
  nickName: Joi.string().trim().required().min(5).alphanum().max(15).messages({
    'any.required': 'El nickName es obligatorio',
    'string.min': 'El nickName debe tener {#limit} caracteres como minimo',
    'string.max': 'El nickName debe tener {#limit} caracteres como maximo',
    'string.base': 'El nickName tiene que ser un string',
    'string.alphanum': 'El nickName no puede tener espacios'
  }),
  email: Joi.string().required().email().min(5).max(20).messages({
    'any.required': 'El email es obligatorio',
    'string.min': 'El email debe tener {#limit} caracteres como minimo',
    'string.max': 'El email debe tener {#limit} caracteres como maximo',
    'string.base': 'El email tiene que ser un string',
    'string.email': 'El email ingresado es incorrecto'
  })
})

module.exports = userSchema
