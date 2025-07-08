const { Router } = require('express')
const { tagControllers } = require('../controllers')
const { Tag } = require('../db/models')
const { genericMiddlewares, tagMiddlewares } = require('../middlewares')
const { tagSchema } = require('../schemas')
const tagRoutes = Router()

// Rutas
tagRoutes.get('/', tagControllers.getTags)

tagRoutes.get(
  '/:id',
  genericMiddlewares.validateID(Tag),
  genericMiddlewares.existID(Tag),
  tagControllers.getTagById
)
// ruta para ver de un tag, segun su id, todos los posts que lo tienen asignado.
tagRoutes.get(
  '/:id/posts',
  genericMiddlewares.validateID(Tag),
  genericMiddlewares.existID(Tag),
  tagControllers.verPosts)

tagRoutes.post(
  '/',
  genericMiddlewares.validatorSchema(tagSchema),
  tagMiddlewares.existTag,
  tagControllers.createTag
)

tagRoutes.put(
  '/:id',
  genericMiddlewares.validatorSchema(tagSchema),
  genericMiddlewares.validateID(Tag),
  genericMiddlewares.existID(Tag),
  tagMiddlewares.existTag,
  tagControllers.updateTagById
)

tagRoutes.delete(
  '/:id',
  genericMiddlewares.validateID(Tag),
  genericMiddlewares.existID(Tag),
  tagControllers.deleteTagById
)

// Exportacion
module.exports = tagRoutes
