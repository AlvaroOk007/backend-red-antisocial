const express = require('express')
const openapiSpecification = require('./docs/swagger.js')
const swaggerUI = require('swagger-ui-express')
const db = require('./db/models/index.js')
const cors = require('cors')

// Accedo a la variable de entorno si existe
require('dotenv').config()

// Obtengo el puerto
const PORT = process.env.PORT || 3001

// Creo la instancia de mi aplicacion
const app = express()

// Permito los cors
app.use(cors())

// Configuraciones necesarias
app.use(express.json())
app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

// Listo mi aplicacion al puerto
app.listen(PORT, async () => {
  // await db.sequelize.sync({ force: true })
  console.log(`Aplicacion corriendo en el puerto http://localhost:${PORT}`)
})
// Exporto mi aplicacion
module.exports = app
