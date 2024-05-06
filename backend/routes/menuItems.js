const express = require('express');
const MenuItem = require('../models/MenuItem'); // Adjust the path as necessary
const router = express.Router();

// Endpoint to get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        // Convert Decimal128 price to a string or number
        const transformedItems = menuItems.map(item => ({
            ...item._doc,
            price: item.price.toString(), // Convert Decimal128 to string
        }));
        res.json(transformedItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
