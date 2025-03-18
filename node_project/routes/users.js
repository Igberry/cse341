const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers); // Fetch all users
router.get('/:id', usersController.getUserById); // Fetch single user by ID
router.post('/', usersController.createUser); // Create new user
router.put('/:id', usersController.updateUser); // Update user
router.delete('/:id', usersController.deleteUser); // Delete user

module.exports = router;
