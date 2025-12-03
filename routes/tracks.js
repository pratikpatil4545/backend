const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find().populate('artist').populate('album');
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get track by ID
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate('artist').populate('album');
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
