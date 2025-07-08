const { Router } = require('express')
const commentRoutes = Router()
const { Comment, User, Post } = require('../db/models')
const { genericMiddlewares } = require('../middlewares')
const { commentSchema } = require('../schemas')
const { commentController } = require('../controllers')

commentRoutes.get('/', commentController.getAllComments)

commentRoutes.get('/:id',
  genericMiddlewares.validateID(),
  genericMiddlewares.existID(Comment),
  commentController.getCommentById)

commentRoutes.post('/',
  genericMiddlewares.checkIdInModel(User, 'UserId'),
  genericMiddlewares.checkIdInModel(Post, 'PostId'),
  genericMiddlewares.validatorSchema(commentSchema),
  commentController.createComment)

commentRoutes.put('/:id',
  genericMiddlewares.validateID(),
  genericMiddlewares.existID(Comment),
  commentController.updateComment)

commentRoutes.delete('/:id',
  genericMiddlewares.validateID(),
  genericMiddlewares.existID(Comment),
  commentController.deleteCommentById)

module.exports = commentRoutes
