const Client = require('../models/client');

// @desc   Get all clients
// @route  GET /clients
const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        const formattedClients = clients.map(client => ({
            _id: client._id, // ✅ ID at the top
            firstName: client.firstName,
            lastName: client.lastName,
            username: client.username,
            email: client.email,
            password: client.password,
            favoriteColor: client.favoriteColor,
            birthday: client.birthday,
            ipaddress: client.ipaddress,
            country: client.country,
            createdAt: client.createdAt
        }));
        res.status(200).json(formattedClients);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc   Get client by ID
// @route  GET /clients/:id
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const formattedClient = {
            _id: client._id, // ✅ ID at the top
            firstName: client.firstName,
            lastName: client.lastName,
            username: client.username,
            email: client.email,
            password: client.password,
            favoriteColor: client.favoriteColor,
            birthday: client.birthday,
            ipaddress: client.ipaddress,
            country: client.country,
            createdAt: client.createdAt
        };

        res.status(200).json(formattedClient);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc   Create a new client
// @route  POST /clients
const createClient = async (req, res) => {
    console.log("Received request body:", req.body); // ✅ Debugging Step

    const { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country } = req.body;

    if (!firstName || !lastName || !username || !password || !email || !favoriteColor || !birthday || !ipaddress || !country) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingClient = await Client.findOne({ $or: [{ username }, { email }] });
        if (existingClient) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newClient = new Client({ firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country });
        await newClient.save();

        const formattedClient = {
            _id: newClient._id, // ✅ ID at the top
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            username: newClient.username,
            email: newClient.email,
            password: newClient.password,
            favoriteColor: newClient.favoriteColor,
            birthday: newClient.birthday,
            ipaddress: newClient.ipaddress,
            country: newClient.country,
            createdAt: newClient.createdAt
        };

        res.status(201).json(formattedClient);
    } catch (error) {
        console.error("Error saving client:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   Update a client
// @route  PUT /clients/:id
const updateClient = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country } = req.body;

        if (!firstName && !lastName && !username && !password && !email && !favoriteColor && !birthday && !ipaddress && !country) {
            return res.status(400).json({ message: 'At least one field is required for update' });
        }

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, username, password, email, favoriteColor, birthday, ipaddress, country },
            { new: true, runValidators: true }
        );

        if (!updatedClient) return res.status(404).json({ message: 'Client not found' });

        const formattedClient = {
            _id: updatedClient._id, // ✅ ID at the top
            firstName: updatedClient.firstName,
            lastName: updatedClient.lastName,
            username: updatedClient.username,
            email: updatedClient.email,
            password: updatedClient.password,
            favoriteColor: updatedClient.favoriteColor,
            birthday: updatedClient.birthday,
            ipaddress: updatedClient.ipaddress,
            country: updatedClient.country,
            createdAt: updatedClient.createdAt
        };

        res.status(200).json(formattedClient);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc   Delete a client
// @route  DELETE /clients/:id
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
