const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-store')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

mongoose.connection.once('open', async () => {
  console.log('MongoDB Connected');

  // Create text indexes for smart search
  try {
    await mongoose.connection.db.collection('albums').createIndex({
      title: 'text',
      genre: 'text'
    });
    await mongoose.connection.db.collection('videos').createIndex({
      title: 'text',
      category: 'text'
    });
    await mongoose.connection.db.collection('artists').createIndex({
      name: 'text',
      bio: 'text'
    });
    console.log('Text indexes created');
  } catch (err) {
    console.log('Indexes already exist or error:', err.message);
  }
});

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Music Store API is running' });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/tracks', require('./routes/tracks'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/videos', require('./routes/videos'));  // ✅ This is correct
app.use('/api/staff', require('./routes/staff'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/search', require('./routes/search'));

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
