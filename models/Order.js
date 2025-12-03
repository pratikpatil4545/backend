const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: Object }],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['online', 'cash'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  qrCode: { type: String },
  barcode: { type: String },
  downloadStatus: { type: String, enum: ['available', 'downloaded', 'expired'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
