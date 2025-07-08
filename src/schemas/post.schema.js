const Joi = require("joi");

const postTagSchema = Joi.object({
  description: Joi.string().trim().required().min(1).max(100).messages({
    "any.required": "Debe contener descripción",
    "string.min": "La descripción debe tener {#limit} caracteres como minimo",
    "string.max": "La descripción debe tener {#limit} caracteres como máximo",
    "string.base": "La descripción tiene que ser un string",
  }),
  UserId: Joi.number(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string()
          .trim()
          .uri({ scheme: ["http", "https"] })
          .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
          .messages({
            "any.required": "La URL es requerida.",
            "string.uri": "La URL debe ser válida con http o https.",
            "string.pattern.base":
              "La URL de la imagen debe terminar en .jpg, .jpeg, .png, .gif o .webp.",
            "string.empty": "La URL no puede ser vacia.",
          }),
      })
    )
    .optional(),
});

module.exports = postTagSchema;
