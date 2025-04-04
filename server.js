require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const connectDB = require('./config/db');

const ordersRoutes = require('./routes/orders');
const clientsRoutes = require('./routes/clients');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware (Use only express.json and express.urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Pass `app` to passport-config AFTER initializing `app`
require('./config/passport-config')(app);

// Test Route
app.get('/', (req, res) => {
  res.send("Welcome to your CRUD API with Authentication!");
});

// API Routes
app.use('/clients', clientsRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

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
