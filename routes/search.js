const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Video = require('../models/Video');
const Track = require('../models/Track');

// Smart search with auto-suggest (returns all types)
router.get('/suggest/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const searchRegex = new RegExp(query, 'i');
    
    const [albums, artists, tracks, videos] = await Promise.all([
      Album.find({ title: searchRegex }).populate('artist').limit(5),
      Artist.find({ name: searchRegex }).limit(5),
      Track.find({ title: searchRegex }).populate('artist').limit(5),
      Video.find({ title: searchRegex }).populate('artist').limit(5)
    ]);
    
    res.json({
      albums,
      artists,
      tracks,
      videos,
      suggestions: [
        ...albums.map(a => ({ type: 'album', title: a.title, id: a._id })),
        ...artists.map(a => ({ type: 'artist', title: a.name, id: a._id })),
        ...tracks.map(t => ({ type: 'track', title: t.title, id: t._id })),
        ...videos.map(v => ({ type: 'video', title: v.title, id: v._id }))
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Comprehensive search with tabs
router.get('/all/:query', async (req, res) => {
  try {
    const query = req.params.query;
    
    const [albums, artists, videos, tracks] = await Promise.all([
      Album.find({ $text: { $search: query } })
        .populate('artist')
        .limit(20),
      Artist.find({ $text: { $search: query } })
        .limit(20),
      Video.find({ $text: { $search: query } })
        .populate('artist')
        .limit(20),
      Track.find({ $text: { $search: query } })
        .populate('artist album')
        .limit(20)
    ]);
    
    res.json({
      albums,
      artists,
      videos,
      tracks,
      total: albums.length + artists.length + videos.length + tracks.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
