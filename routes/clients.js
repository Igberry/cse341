const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');

router.get('/', clientsController.getClients); // Fetch all users
router.get('/:id', clientsController.getClientById); // Fetch single user by ID
router.post('/', clientsController.createClient); // Create new user
router.put('/:id', clientsController.updateClient); // Update user
router.delete('/:id', clientsController.deleteClient); // Delete user

module.exports = router;
