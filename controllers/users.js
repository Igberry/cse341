const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL USERS
const getAll = async (req, res) => {
    //#swagger.tags = [Users]
    const result = mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// GET A SINGLE USER BY ID
const getSingle = async (req, res) => {
    //#swagger.tags = [Users]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

// POST - CREATE A NEW USER
const createUser = async (req, res) => {
    //#swagger.tags = [Users]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        ipaddress: req.body.ipaddress
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: "User created successfully", id: response.insertedId });
        } else {
            res.status(500).json({ error: "Failed to create user" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT - UPDATE A USER
const updateUser = async (req, res) => {
    //#swagger.tags = [Users]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        ipaddress: req.body.ipaddress
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $set: user }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ error: "User not found or no changes made" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - REMOVE A SPECIFIC USER
const deleteUser = async (req, res) => {
    //#swagger.tags = [Users]
    const userId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
