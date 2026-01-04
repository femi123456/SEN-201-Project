require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
db.connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/ai', require('./routes/ai'));

// Serve Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ msg: 'Internal Server Error', error: err.message });
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  // Set static folder - Only if NOT on Vercel (Vercel handles this via rewrites)
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ msg: 'NileVault API Running...', env: process.env.NODE_ENV });
  });
}

// Only listen if NOT running as a serverless function (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;

