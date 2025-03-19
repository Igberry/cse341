const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    favoriteColor: { type: String, required: true },
    birthday: { type: String, required: true },
    ipaddress: { type: String, required: true },
    country: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
