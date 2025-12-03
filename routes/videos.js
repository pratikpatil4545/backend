const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('artist');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured videos
router.get('/featured', async (req, res) => {
  try {
    const videos = await Video.find({ featured: true }).populate('artist');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get videos by category
router.get('/category/:category', async (req, res) => {
  try {
    const videos = await Video.find({ category: req.params.category }).populate('artist');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('artist');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search videos
router.get('/search/:query', async (req, res) => {
  try {
    const videos = await Video.find({ 
      title: { $regex: req.params.query, $options: 'i' } 
    }).populate('artist').limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
