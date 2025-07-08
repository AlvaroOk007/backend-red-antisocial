const postControllers = require('./post.controllers')
const tagControllers = require('./tag.controllers')
const userControllers = require('./user.controllers')
const imageControllers = require('./image.controllers')
const commentController = require('./comment.controllers')
const postTagControllers = require('./postTag.controllers')

// Exportacion
module.exports = {
  postControllers,
  tagControllers,
  userControllers,
  imageControllers,
  commentController,
  postTagControllers
}
