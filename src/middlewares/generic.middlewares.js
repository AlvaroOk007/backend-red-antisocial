const existID = (model) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params
      const existID = await model.findByPk(id)
      if (!existID) return res.status(404).json({ message: 'No se encontró el id ', id })
      next()
    } catch (error) {
      console.error('Error al consultar por la ID', error)
      res.status(500).json({ message: 'Error en el servidor al consultar por la id', error })
    }
  }
}

const checkIdInModel = (model, idName) => {
  return async (req, res, next) => {
    const id = req.body[idName]
    const oneElement = await model.findByPk(id)
    if (!oneElement) {
      return res.status(404).json({ message: 'No existe el id' })
    }
    next()
  }
}

const validateID = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params

      if (id === undefined) return res.status(500).json({ message: 'Error, es necesario ingresar un ID' })

      // Verifico que es un numero
      if (isNaN(id)) return res.status(500).json({ message: `Error, '${id}' debe ser un numero` })

      // Verifico que sea positivo
      if (id < 0) return res.status(500).json({ message: `Error, '${id}' no puede ser negativo` })

      // Paso al siguiente Middleware
      next()
    } catch (error) {
      console.error('Error al verificar el ID')
      res.status(400).json({ message: 'Error en el servidor al verificar la ID' })
    }
  }
}

const validatorSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errores = error.details.map(detail => {
        return {
          attributeError: detail.path[0],
          messageError: detail.message,
          typeError: detail.type
        }
      })
      return res.status(400).json(errores)
    }
    next()
  }
}

// Exportacion
module.exports = { existID, validateID, validatorSchema, checkIdInModel }
