const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const Video = require('../models/Video');  // ADD THIS AT THE TOP

// Add Artist
router.post('/artist', async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Album
router.post('/album', async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    
    await Artist.findByIdAndUpdate(album.artist, { $push: { albums: album._id } });
    
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Track
router.post('/track', async (req, res) => {
  try {
    const track = new Track(req.body);
    await track.save();
    
    await Album.findByIdAndUpdate(track.album, { $push: { tracks: track._id } });
    
    res.json(track);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Video
router.post('/video', async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MASSIVE SEED DEMO DATA
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Track.deleteMany({});
    await Video.deleteMany({});

    console.log('Creating artists...');

    // Create Artists
    const artists = await Artist.insertMany([
      {
        name: 'Arijit Singh',
        bio: 'One of the most prominent Indian playback singers of contemporary Bollywood',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        genres: ['Bollywood', 'Romantic'],
        featured: true
      },
      {
        name: 'A.R. Rahman',
        bio: 'Academy Award-winning composer and music producer',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
        genres: ['Film Score', 'World Music'],
        featured: true
      },
      {
        name: 'Shreya Ghoshal',
        bio: 'Acclaimed Indian playback singer with numerous awards',
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
        genres: ['Bollywood', 'Classical'],
        featured: true
      },
      {
        name: 'Sonu Nigam',
        bio: 'Versatile playback singer known for melodious voice',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        genres: ['Bollywood', 'Pop'],
        featured: false
      },
      {
        name: 'Neha Kakkar',
        bio: 'Popular Indian singer known for peppy Bollywood songs',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        genres: ['Pop', 'Bollywood'],
        featured: true
      },
      {
        name: 'Atif Aslam',
        bio: 'Pakistani singer-songwriter and actor',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        genres: ['Romantic', 'Pop'],
        featured: false
      },
      {
        name: 'Badshah',
        bio: 'Indian rapper and music producer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        genres: ['Pop', 'Bollywood'],
        featured: true
      },
      {
        name: 'Pritam',
        bio: 'Leading Bollywood music composer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        genres: ['Film Score', 'Bollywood'],
        featured: false
      },
      {
        name: 'Vishal-Shekhar',
        bio: 'Dynamic music composer duo',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        genres: ['Film Score', 'Pop'],
        featured: false
      },
      {
        name: 'Armaan Malik',
        bio: 'Young playback singer and performer',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        genres: ['Pop', 'Romantic'],
        featured: false
      },
      {
        name: 'Sunidhi Chauhan',
        bio: 'Powerful voice in Bollywood music industry',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        genres: ['Bollywood', 'Pop'],
        featured: false
      },
      {
        name: 'Darshan Raval',
        bio: 'Young sensation in independent music',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        genres: ['Pop', 'Romantic'],
        featured: true
      },
      {
        name: 'Jubin Nautiyal',
        bio: 'Rising star with soulful voice',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        genres: ['Romantic', 'Bollywood'],
        featured: false
      },
      {
        name: 'Guru Randhawa',
        bio: 'Punjabi singer and songwriter',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        genres: ['Pop', 'World Music'],
        featured: true
      },
      {
        name: 'Monali Thakur',
        bio: 'National Award-winning playback singer',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        genres: ['Bollywood', 'Classical'],
        featured: false
      }
    ]);

    console.log(`Created ${artists.length} artists`);

    // Create Albums
    const albumsData = [
      { title: 'Love Collection', artistIndex: 0, genre: 'Romantic', price: 299, trackPrice: 29, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Heartbreak Anthems', artistIndex: 0, genre: 'Romantic', price: 349, trackPrice: 35, popular: true, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Melodies of Love', artistIndex: 0, genre: 'Romantic', price: 279, trackPrice: 28, featured: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Greatest Hits', artistIndex: 1, genre: 'Film Score', price: 399, trackPrice: 39, popular: true, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
      { title: 'The Maestro', artistIndex: 1, genre: 'World Music', price: 449, trackPrice: 45, featured: true, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Divine Voice', artistIndex: 2, genre: 'Classical', price: 329, trackPrice: 33, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Soulful Renditions', artistIndex: 2, genre: 'Bollywood', price: 299, trackPrice: 30, popular: false, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Classic Collection', artistIndex: 3, genre: 'Bollywood', price: 319, trackPrice: 32, featured: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Romantic Melodies', artistIndex: 3, genre: 'Pop', price: 289, trackPrice: 29, popular: true, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Party Hits', artistIndex: 4, genre: 'Pop', price: 249, trackPrice: 25, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Wedding Special', artistIndex: 4, genre: 'Bollywood', price: 299, trackPrice: 30, popular: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Dance Floor', artistIndex: 4, genre: 'Pop', price: 269, trackPrice: 27, featured: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Romantic Journey', artistIndex: 5, genre: 'Romantic', price: 339, trackPrice: 34, popular: true, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
      { title: 'Soulful Nights', artistIndex: 5, genre: 'Pop', price: 299, trackPrice: 30, featured: false, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Hip Hop Beats', artistIndex: 6, genre: 'Pop', price: 279, trackPrice: 28, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Street Vibes', artistIndex: 6, genre: 'Bollywood', price: 249, trackPrice: 25, popular: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Blockbuster Collection', artistIndex: 7, genre: 'Film Score', price: 389, trackPrice: 39, featured: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Musical Journey', artistIndex: 7, genre: 'Bollywood', price: 349, trackPrice: 35, popular: true, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
      { title: 'Chart Toppers', artistIndex: 8, genre: 'Film Score', price: 359, trackPrice: 36, featured: true, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Dance Anthems', artistIndex: 8, genre: 'Pop', price: 299, trackPrice: 30, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Young Hearts', artistIndex: 9, genre: 'Pop', price: 269, trackPrice: 27, featured: false, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Love Songs', artistIndex: 9, genre: 'Romantic', price: 289, trackPrice: 29, popular: true, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Power Voice', artistIndex: 10, genre: 'Bollywood', price: 319, trackPrice: 32, featured: false, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
      { title: 'Energetic Hits', artistIndex: 10, genre: 'Pop', price: 279, trackPrice: 28, popular: false, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Indie Vibes', artistIndex: 11, genre: 'Pop', price: 249, trackPrice: 25, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Romantic Tales', artistIndex: 11, genre: 'Romantic', price: 269, trackPrice: 27, popular: true, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Melodious Nights', artistIndex: 12, genre: 'Romantic', price: 299, trackPrice: 30, featured: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' },
      { title: 'Soulful Expressions', artistIndex: 12, genre: 'Bollywood', price: 279, trackPrice: 28, popular: false, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
      { title: 'Punjabi Beats', artistIndex: 13, genre: 'World Music', price: 259, trackPrice: 26, featured: true, newRelease: true, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' },
      { title: 'Desi Vibes', artistIndex: 13, genre: 'Pop', price: 249, trackPrice: 25, popular: true, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
      { title: 'Versatile Voice', artistIndex: 14, genre: 'Bollywood', price: 309, trackPrice: 31, featured: false, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
      { title: 'Classical Fusion', artistIndex: 14, genre: 'Classical', price: 329, trackPrice: 33, popular: false, cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400' }
    ];

    const albums = [];
    for (let albumData of albumsData) {
      const album = await Album.create({
        title: albumData.title,
        artist: artists[albumData.artistIndex]._id,
        coverArt: albumData.cover,
        releaseDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        genre: albumData.genre,
        price: albumData.price,
        trackPrice: albumData.trackPrice,
        featured: albumData.featured || false,
        newRelease: albumData.newRelease || false,
        popular: albumData.popular || false,
        licenseOwner: ['T-Series', 'Sony Music', 'Zee Music', 'YRF Music', 'Tips Music'][Math.floor(Math.random() * 5)]
      });
      albums.push(album);
    }

    console.log(`Created ${albums.length} albums`);

    // Create Tracks
    const songTitles = [
      'Tum Hi Ho', 'Channa Mereya', 'Ae Dil Hai Mushkil', 'Gerua', 'Raabta',
      'Pal', 'Tera Ban Jaunga', 'Kalank', 'Kesariya', 'Apna Bana Le',
      'Jai Ho', 'Kun Faya Kun', 'Chaiyya Chaiyya', 'Vande Mataram', 'Dil Se Re',
      'Main Rang Sharbaton Ka', 'Samjhawan', 'Tera Zikr', 'Tera Ghata', 'Kamariya',
      'Dilbar', 'Gali Gali', 'Coca Cola', 'Nikle Currant', 'Manike', 'Bijli',
      'Pasoori', 'Kala Chashma', 'Gallan Goodiyaan', 'London Thumakda',
      'Desi Girl', 'Badtameez Dil', 'Shayad', 'Bekhayali', 'Tujhe Kitna Chahne Lage',
      'Hawayein', 'Pachtaoge', 'Lut Gaye', 'Raatan Lambiyan', 'Ranjha',
      'Mehrama', 'Makhna', 'Ghungroo', 'Dil Diyan Gallan', 'Humsafar'
    ];

    let trackCount = 0;
    for (let album of albums) {
      const numTracks = Math.floor(Math.random() * 4) + 5;
      const albumTracks = [];

      for (let i = 0; i < numTracks; i++) {
        const randomTitle = songTitles[Math.floor(Math.random() * songTitles.length)] + (Math.random() > 0.7 ? ' (Remix)' : '');
        const minutes = Math.floor(Math.random() * 3) + 3;
        const seconds = Math.floor(Math.random() * 60);
        
        const track = await Track.create({
          title: `${randomTitle} ${i + 1}`,
          album: album._id,
          artist: album.artist,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
          trackNumber: i + 1,
          price: album.trackPrice,
          previewFile: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`
        });
        
        albumTracks.push(track._id);
        trackCount++;
      }

      album.tracks = albumTracks;
      await album.save();
      await Artist.findByIdAndUpdate(album.artist, { $push: { albums: album._id } });
    }

    console.log(`Created ${trackCount} tracks`);

    // Create Videos (NO require here - already imported at top!)
    console.log('Creating videos...');
    
    const videos = await Video.insertMany([
      {
        title: 'Tum Hi Ho - Official Music Video',
        artist: artists[0]._id,
        producer: 'T-Series',
        thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=Jc9OK2fV2PE',
        format: 'MP4',
        category: 'Music Video',
        duration: '4:22',
        quality: 'HD',
        price: 99,
        description: 'Official music video from Aashiqui 2',
        featured: true,
        newRelease: false,
        licenseOwner: 'T-Series'
      },
      {
        title: 'Channa Mereya - Live Performance',
        artist: artists[0]._id,
        producer: 'Sony Music',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=bzSTpdcs-EA',
        format: 'MP4',
        category: 'Live Concert',
        duration: '5:18',
        quality: '4K',
        price: 149,
        description: 'Live concert performance',
        featured: true,
        popular: true,
        licenseOwner: 'Sony Music'
      },
      {
        title: 'Kun Faya Kun - Concert Recording',
        artist: artists[1]._id,
        producer: 'YRF Music',
        thumbnailUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=T94PHkuydcw',
        format: 'VOB',
        category: 'Live Concert',
        duration: '7:52',
        quality: 'HD',
        price: 199,
        description: 'Sufi performance from Rockstar',
        popular: true,
        licenseOwner: 'YRF Music'
      },
      {
        title: 'Dilbar - Dance Video',
        artist: artists[4]._id,
        producer: 'T-Series',
        thumbnailUrl: 'https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=JFcgOboQZ08',
        format: 'MP4',
        category: 'Music Video',
        duration: '3:32',
        quality: 'HD',
        price: 79,
        description: 'Official music video',
        newRelease: true,
        featured: false,
        licenseOwner: 'T-Series'
      },
      {
        title: 'Gerua - Behind The Scenes',
        artist: artists[0]._id,
        producer: 'Red Chillies',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=AEIVlYegHx8',
        format: 'MP4',
        category: 'Behind The Scenes',
        duration: '6:15',
        quality: 'HD',
        price: 49,
        description: 'Making of Gerua from Dilwale',
        featured: false,
        licenseOwner: 'Red Chillies'
      },
      {
        title: 'Badshah Live in Mumbai',
        artist: artists[6]._id,
        producer: 'Sony Music',
        thumbnailUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        category: 'Live Concert',
        duration: '45:30',
        quality: '4K',
        price: 299,
        description: 'Full concert from Mumbai',
        featured: true,
        newRelease: true,
        licenseOwner: 'Sony Music'
      },
      {
        title: 'Shreya Ghoshal - MTV Unplugged',
        artist: artists[2]._id,
        producer: 'MTV India',
        thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        category: 'Live Concert',
        duration: '38:45',
        quality: 'HD',
        price: 249,
        description: 'Acoustic session with Shreya Ghoshal',
        popular: true,
        licenseOwner: 'MTV India'
      },
      {
        title: 'Pritam - Music Documentary',
        artist: artists[7]._id,
        producer: 'Netflix India',
        thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        category: 'Documentary',
        duration: '52:20',
        quality: '4K',
        price: 199,
        description: 'Journey of Bollywood composer Pritam',
        featured: false,
        licenseOwner: 'Netflix'
      },
      {
        title: 'Gallan Goodiyaan - Making Of',
        artist: artists[8]._id,
        producer: 'Dharma Productions',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        category: 'Behind The Scenes',
        duration: '12:45',
        quality: 'HD',
        price: 59,
        description: 'Behind the scenes of Gallan Goodiyaan',
        newRelease: false,
        licenseOwner: 'Dharma'
      },
      {
        title: 'Guru Randhawa - Suit Suit Video',
        artist: artists[13]._id,
        producer: 'T-Series',
        thumbnailUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400',
        videoUrl: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        category: 'Music Video',
        duration: '3:18',
        quality: 'HD',
        price: 89,
        description: 'Hit Punjabi track music video',
        popular: true,
        featured: true,
        licenseOwner: 'T-Series'
      }
    ]);

    console.log(`Created ${videos.length} videos`);

    res.json({ 
      message: 'Massive demo data seeded successfully!',
      stats: {
        artists: artists.length,
        albums: albums.length,
        tracks: trackCount,
        videos: videos.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: error.message, error: error.stack });
  }
});

module.exports = router;
