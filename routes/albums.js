const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// Get all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().populate('artist').populate('tracks');
    res.json(albums);
  } catch (error) {
    console.error('Error in GET /albums:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

// Get featured albums
router.get('/featured', async (req, res) => {
  try {
    const albums = await Album.find({ featured: true }).populate('artist').populate('tracks');
    res.json(albums);
  } catch (error) {
    console.error('Error in GET /albums/featured:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get new releases
router.get('/new-releases', async (req, res) => {
  try {
    const albums = await Album.find({ newRelease: true }).populate('artist').populate('tracks');
    res.json(albums);
  } catch (error) {
    console.error('Error in GET /albums/new-releases:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get popular albums
router.get('/popular', async (req, res) => {
  try {
    const albums = await Album.find({ popular: true }).populate('artist').populate('tracks');
    res.json(albums);
  } catch (error) {
    console.error('Error in GET /albums/popular:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get album by ID
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist').populate('tracks');
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
  } catch (error) {
    console.error('Error in GET /albums/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Search albums
router.get('/search/:query', async (req, res) => {
  try {
    const albums = await Album.find({ 
      title: { $regex: req.params.query, $options: 'i' } 
    }).populate('artist').limit(10);
    res.json(albums);
  } catch (error) {
    console.error('Error in GET /albums/search:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
