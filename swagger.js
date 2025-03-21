const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Client API',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: 'https://cse341-30rh.onrender.com',
        description: 'Live server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Make sure this path matches where your routes are
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
