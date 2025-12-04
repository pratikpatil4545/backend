const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Lookup order by order number or barcode
router.get('/lookup/:identifier', async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [
        { orderNumber: req.params.identifier },
        { barcode: req.params.identifier }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark order as paid (cash payment)
router.post('/mark-paid/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.paymentStatus = 'paid';
    await order.save();
    
    res.json({ message: 'Order marked as paid', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pending orders
router.get('/pending', async (req, res) => {
  try {
    const orders = await Order.find({ paymentStatus: 'pending' })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
