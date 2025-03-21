const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const clientsController = require('../controllers/clients');

// Validation middleware for creating or updating a client
const validateClient = [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('email').isEmail().withMessage('Email must be valid'),
    check('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    check('birthday').notEmpty().withMessage('Birthday is required'),
    check('ipaddress').notEmpty().withMessage('IP address is required'),
    check('country').notEmpty().withMessage('Country is required'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Routes with validation
router.get('/', clientsController.getClients);
router.get('/:id', clientsController.getClientById);
router.post('/', validateClient, handleValidationErrors, clientsController.createClient);
router.put('/:id', validateClient, handleValidationErrors, clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
