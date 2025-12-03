const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  duration: { type: String },
  trackNumber: { type: Number },
  audioFile: { type: String },
  previewFile: { type: String },
  price: { type: Number },
  lyrics: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', trackSchema);
