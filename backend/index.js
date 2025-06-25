// index.js
require('dotenv').config(); // Load env variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// Import routes
const contentRoutes = require('./routes/routess');
const adminRoutes = require('./routes/admin');

const app = express();

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174','https://kavika-frontend-5aor.vercel.app'],
    credentials: true,
  })); // Allow all origins or restrict
app.use(cookieParser());
app.use(express.json()); // Parse JSON bodies
// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Static files (optional if serving images)
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/contents', contentRoutes);
app.use('/admin/login', adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('❌ Error handler:', err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
