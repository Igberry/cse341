const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // Load environment variables

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in .env or Render environment settings");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
};

module.exports = connectDB;
