// File: /routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');  // Adjust according to your directory structure

router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);  // Assuming body contains the necessary order structure
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
