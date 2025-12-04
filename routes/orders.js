const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const QRCode = require('qrcode');

// Create order from cart
router.post('/create', async (req, res) => {
  try {
    const { sessionId, paymentMethod } = req.body;
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderNumber = 'ORD-' + Date.now();
    const qrCode = await QRCode.toDataURL(orderNumber);
    
    const order = new Order({
      orderNumber,
      userId: cart.userId,
      items: cart.items,
      total: cart.total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      qrCode,
      barcode: orderNumber,
      downloadStatus: 'available'
    });

    await order.save();
    await Cart.findOneAndDelete({ sessionId });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get orders by user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Scan order (front desk - mark as paid)
router.post('/scan/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.paymentStatus = 'paid';
    await order.save();
    
    res.json({ message: 'Order marked as paid', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download item (with rules)
router.get('/download/:orderId/:itemId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    if (order.paymentStatus !== 'paid') {
      return res.status(403).json({ message: 'Payment required' });
    }

    if (order.downloadStatus === 'expired') {
      return res.status(403).json({ message: 'Download expired' });
    }

    // Update download status (one-time example)
    order.downloadStatus = 'downloaded';
    await order.save();

    res.json({ 
      message: 'Download ready',
      downloadUrl: `/api/files/download/${req.params.itemId}`,
      expiresIn: '24h'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
