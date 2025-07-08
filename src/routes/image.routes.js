const { Router } = require('express')
const imageRoutes = Router()
const { Image } = require('../db/models')
const { imageControllers } = require('../controllers')
const { genericMiddlewares } = require('../middlewares')
const { imageSchema } = require('../schemas')

imageRoutes.get('/', imageControllers.getImages)

imageRoutes.get('/:id',
  genericMiddlewares.validateID(),
  genericMiddlewares.existID(Image),
  imageControllers.getImageById)

imageRoutes.post('/',
  genericMiddlewares.validatorSchema(imageSchema),
  imageControllers.createImage)

imageRoutes.delete('/:id',
  genericMiddlewares.validateID(),
  genericMiddlewares.existID(Image),
  imageControllers.deleteImageById)

module.exports = imageRoutes
