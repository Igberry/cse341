require('dotenv').config({ path: __dirname + '/.env' }); // Ensure dotenv loads the correct file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db'); // Import the DB connection function
require('./config/passport-config'); // Import Passport.js configuration

const ordersRoutes = require('./routes/orders');
const clientsRoutes = require('./routes/clients');
const authRoutes = require('./routes/auth'); // Authentication Routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(bodyParser.json());

// Session Middleware (Needed for Passport.js)
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret', // Secure your session secret
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Test Route
app.get('/', (req, res) => {
  res.send("Welcome to your CRUD API with Authentication!");
});

// API Routes
app.use('/clients', clientsRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes); // Add authentication routes

// Swagger Docs
const swaggerDocument = JSON.parse(fs.readFileSync(__dirname + '/swagger.json', 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
