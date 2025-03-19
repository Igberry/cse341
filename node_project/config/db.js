const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // Ensure dotenv loads correctly

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URI is not defined in .env");
        }

        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
};

module.exports = connectDB;
