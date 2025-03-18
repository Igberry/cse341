const User = require('../models/user');

// @desc   Get all users
// @route  GET /users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            favoriteColor: user.favoriteColor,
            birthday: user.birthday,
            ipaddress: user.ipaddress,
            country: user.country,
            createdAt: user.createdAt
        }));
        res.status(200).json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const formattedUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            favoriteColor: user.favoriteColor,
            birthday: user.birthday,
            ipaddress: user.ipaddress,
            country: user.country,
            createdAt: user.createdAt
        };

        res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !username || !password || !email || !favoriteColor || !birthday || !ipaddress || !country) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create and save the new user
        const newUser = new User({ firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country });
        await newUser.save();

        const formattedUser = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            favoriteColor: newUser.favoriteColor,
            birthday: newUser.birthday,
            ipaddress: newUser.ipaddress,
            country: newUser.country,
            createdAt: newUser.createdAt
        };

        res.status(201).json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country } = req.body;

        // Ensure at least one field is being updated
        if (!firstName && !lastName && !username && !password && !email && !favoriteColor && !birthday && !ipaddress && !country) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country },
            { new: true, runValidators: true } // Ensures data validation
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        const formattedUser = {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
            favoriteColor: updatedUser.favoriteColor,
            birthday: updatedUser.birthday,
            ipaddress: updatedUser.ipaddress,
            country: updatedUser.country,
            createdAt: updatedUser.createdAt
        };

        res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
