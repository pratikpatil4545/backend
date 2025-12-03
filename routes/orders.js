const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create order
router.post('/create', async (req, res) => {
  try {
    const { userId, items, total, paymentMethod } = req.body;
    
    const orderNumber = 'ORD' + Date.now();
    const qrCode = `QR-${orderNumber}`;
    const barcode = `BAR-${orderNumber}`;

    const order = new Order({
      orderNumber,
      userId,
      items,
      total,
      paymentMethod,
      qrCode,
      barcode
    });

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
