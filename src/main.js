const app = require('./app')
// Importacion de rutas
const { tagRoutes, postRoutes, userRoutes, commentRoutes, postTagsRoutes, imageRoutes } = require('./routes')

// Uso de las rutas
app.use('/tags', tagRoutes)
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)
app.use('/post-tags', postTagsRoutes)
app.use('/images', imageRoutes)
