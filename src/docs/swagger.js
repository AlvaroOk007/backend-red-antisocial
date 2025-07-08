const swaggerJsdoc = require('swagger-jsdoc')
const PORT = process.env.PORT || 3001
// Metadatos de la informacion de nuestra API

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RED ANTISOCIAL PERSIDEV',
      version: '1.0.0',
      description: 'API que simula el comportamiento básico de una red social',
      contact: {
        name: 'Developer'
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Servidor Local'
        }
      ]
    }
  },
  apis: ['./src/docs/*.yml']
}

const openapiSpecification = swaggerJsdoc(options)

module.exports = openapiSpecification
