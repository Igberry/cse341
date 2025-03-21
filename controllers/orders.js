const Order = require('../models/order');

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('clientId', 'firstName lastName email');
        const formattedOrders = orders.map(order => formatOrder(order));
        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('clientId', 'firstName lastName email');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(formatOrder(order));
    } catch (error) {
        console.error("Error fetching order by ID:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    const { clientId, items, totalAmount } = req.body;

    if (!clientId || !items || items.length === 0 || !totalAmount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    for (let item of items) {
        if (!item.productName || !item.quantity || !item.price) {
            return res.status(400).json({ message: 'Each item must have productName, quantity, and price' });
        }
    }

    try {
        const newOrder = new Order({ clientId, items, totalAmount });
        await newOrder.save();
        res.status(201).json(formatOrder(newOrder));
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(formatOrder(updatedOrder));
    } catch (error) {
        console.error("Error updating order:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order:", error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Helper function to format orders
const formatOrder = (order) => {
    const firstItem = order.items.length > 0 ? order.items[0] : {};
    return {
        _id: order._id,
        clientId: order.clientId,
        productName: firstItem.productName || "N/A",
        quantity: firstItem.quantity || 0,
        price: firstItem.price || 0.00,
        totalAmount: order.totalAmount,
        orderDate: order.createdAt,
        __v: order.__v
    };
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };
