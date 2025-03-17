const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type, Authorization']
  }));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow_Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
const routes = require('./routes/index');
app.use('/', routes);

// Initialize Database and Start Server
mongodb.initDb((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit process on failure
    } else {
        app.listen(port, () => {
            console.log(`Database connected successfully`);
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
});
