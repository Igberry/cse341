const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    githubId: { type: String, unique: true, sparse: true }, // GitHub user ID (optional)
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String }, // Password required for manual registration, but not for GitHub OAuth
    email: { type: String, required: false, unique: true },
    avatar: { type: String }, // GitHub profile image
    favoriteColor: { type: String },
    birthday: { type: String },
    ipaddress: { type: String },
    country: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
