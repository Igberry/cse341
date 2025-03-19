const swaggerAutogen = require('swagger-autogen')();

const docs = {
    info: {
      title: "Users Api",
      description: "Users Api",
    },
    host: 'cse341-30rh.onrender.com',
    schemes: ['https'],
  };

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, docs);
