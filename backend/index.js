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
    origin: ['http://localhost:5173','http://localhost:5174','https://kavika-frontend-5aor.vercel.app','https://adminavika.vercel.app',"https://kavikatravels.in"],
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

// Dynamic sitemap — destination pages only (static pages in frontend/public/sitemap-static.xml)
const Content = require('./models/Photo');
app.get('/sitemap-dynamic.xml', async (req, res) => {
  try {
    const contents = await Content.find({}, '_id updatedAt').lean();
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Dynamic destination pages from MongoDB
    for (const item of contents) {
      const lastmod = item.updatedAt
        ? new Date(item.updatedAt).toISOString().split('T')[0]
        : today;
      xml += `  <url>\n`;
      xml += `    <loc>https://www.kavikatravels.in/destinations/${item._id}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
});



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
