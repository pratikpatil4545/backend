const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['album', 'track', 'video'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemDetails: { type: Object },
  price: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: String },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
