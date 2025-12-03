const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().populate('albums');
    res.json(artists);
  } catch (error) {
    console.error('Error in GET /artists:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get featured artists
router.get('/featured', async (req, res) => {
  try {
    const artists = await Artist.find({ featured: true }).populate('albums');
    res.json(artists);
  } catch (error) {
    console.error('Error in GET /artists/featured:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('albums');
    if (!artist) return res.status(404).json({ message: 'Artist not found' });
    res.json(artist);
  } catch (error) {
    console.error('Error in GET /artists/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Search artists
router.get('/search/:query', async (req, res) => {
  try {
    const artists = await Artist.find({ 
      name: { $regex: req.params.query, $options: 'i' } 
    }).limit(10);
    res.json(artists);
  } catch (error) {
    console.error('Error in GET /artists/search:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
