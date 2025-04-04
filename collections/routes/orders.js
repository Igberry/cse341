const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import authentication middleware

// Protected Routes (require authentication)
router.get('/', ensureAuthenticated, ordersController.getOrders);
router.get('/:id', ensureAuthenticated, ordersController.getOrderById);
router.post('/', ensureAuthenticated, ordersController.createOrder);
router.put('/:id', ensureAuthenticated, ordersController.updateOrder);
router.delete('/:id', ensureAuthenticated, ordersController.deleteOrder);

module.exports = router;
