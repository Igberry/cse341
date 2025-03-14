const swaggerAutogen = require('swagger-autogen')();

const docs = {
    info: {
      title: "Users Api",
      description: "Users Api",
    },
    host: 'localhost:3000',
    schemes: ['https', 'http'],
  };

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, docs);
