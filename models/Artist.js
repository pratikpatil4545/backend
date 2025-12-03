const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  genres: [String],
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', artistSchema);
