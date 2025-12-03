const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart
router.get('/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      cart = new Cart({ sessionId: req.params.sessionId, items: [], total: 0 });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', async (req, res) => {
  try {
    const { sessionId, type, itemId, itemDetails, price } = req.body;
    
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [], total: 0 });
    }

    cart.items.push({ type, itemId, itemDetails, price });
    cart.total += price;
    cart.updatedAt = Date.now();
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/:sessionId/:itemIndex', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = parseInt(req.params.itemIndex);
    const removedItem = cart.items[itemIndex];
    cart.total -= removedItem.price;
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = Date.now();

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
