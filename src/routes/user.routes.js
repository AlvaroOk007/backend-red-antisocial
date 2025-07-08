const { Router } = require('express')
const { userControllers } = require('../controllers')
const { User } = require('../db/models')
const { genericMiddlewares, userMiddlewares } = require('../middlewares')
const { userSchema } = require('../schemas')
const userRoutes = Router()

// Metodos
userRoutes.get('/', userControllers.getUsers)

userRoutes.get('/:id',
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userControllers.getUserByPk
)
userRoutes.get('/nickname/:nickName',
  userMiddlewares.checkNickNameExists,
  userControllers.getUserByNickName
)
userRoutes.get('/:id/posts',
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userControllers.getUserWithPosts
)

userRoutes.post('/',
  genericMiddlewares.validatorSchema(userSchema),
  userMiddlewares.checkNickNameNotExists,
  userMiddlewares.checkEmailNotExists,
  userControllers.createUser
)
userRoutes.put('/:id',
  genericMiddlewares.validatorSchema(userSchema),
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userMiddlewares.checkNickNameNotExists,
  userMiddlewares.checkEmailNotExists,
  userControllers.editUser
)
userRoutes.delete('/:id',
  genericMiddlewares.validateID(User),
  genericMiddlewares.existID(User),
  userControllers.deleteUser
)

// Exportacion
module.exports = userRoutes
