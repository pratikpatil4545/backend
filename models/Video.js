const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  producer: { type: String },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  format: { type: String, enum: ['MP4', 'VOB'], default: 'MP4' },
  category: { type: String },
  duration: { type: String }, // e.g., "3:45"
  quality: { type: String, enum: ['HD', 'SD', '4K'], default: 'HD' },
  price: { type: Number, required: true },
  description: { type: String },
  featured: { type: Boolean, default: false },
  newRelease: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  licenseOwner: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
