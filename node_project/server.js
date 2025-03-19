require('dotenv').config({ path: __dirname + '/.env' }); // Ensure dotenv loads the correct file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the DB connection function
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(bodyParser.json());
app.use('/clients', require('./routes/clients'));

const swaggerDocument = JSON.parse(fs.readFileSync(__dirname + '/swagger.json', 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send("Welcome to your CRUD API!");
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
