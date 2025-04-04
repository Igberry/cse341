const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const clientsController = require('../controllers/clients');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import authentication middleware

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

// Protected Routes (require authentication)
router.get('/', ensureAuthenticated, clientsController.getClients);
router.get('/:id', ensureAuthenticated, clientsController.getClientById);
router.post('/', ensureAuthenticated, validateClient, handleValidationErrors, clientsController.createClient);
router.put('/:id', ensureAuthenticated, validateClient, handleValidationErrors, clientsController.updateClient);
router.delete('/:id', ensureAuthenticated, clientsController.deleteClient);

module.exports = router;
