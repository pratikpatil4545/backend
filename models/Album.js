const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  coverArt: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: String },
  price: { type: Number, required: true },
  trackPrice: { type: Number },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  featured: { type: Boolean, default: false },
  newRelease: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  licenseOwner: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', albumSchema);
