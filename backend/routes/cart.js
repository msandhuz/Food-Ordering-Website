const express = require('express');
const Cart = require('../models/Cart'); // Adjust path as necessary
const router = express.Router();

// Get all items in the cart
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate('menuItemId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add an item to the cart
router.post('/cart', async (req, res) => {
  const { menuItemId, quantity } = req.body;
  try {
    const existingItem = await Cart.findOne({ menuItemId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      const newItem = new Cart({ menuItemId, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Increment item quantity
router.patch('/cart/:id/increment', async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    item.quantity += 1;
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Decrement item quantity
router.patch('/cart/:id/decrement', async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      res.status(200).json(item);
    } else {
      res.status(400).json({ message: "Cannot decrement below 1" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove an item from the cart
router.delete('/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
