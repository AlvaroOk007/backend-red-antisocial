const tagRoutes = require('./tag.routes')
const postRoutes = require('./post.routes')
const userRoutes = require('./user.routes')
const commentRoutes = require('./comment.routes')
const postTagsRoutes = require('./tagpost.routes')
const imageRoutes = require('./image.routes')

// Exportacion de rutas
module.exports = {
  tagRoutes,
  postRoutes,
  userRoutes,
  commentRoutes,
  postTagsRoutes,
  imageRoutes
}
