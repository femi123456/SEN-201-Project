if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Middleware (Important for Serverless)
app.use(async (req, res, next) => {
  try {
    if (req.path.startsWith('/api')) {
      await db.connectDB();
    }
    next();
  } catch (err) {
    console.error('DB Middleware Error:', err);
    res.status(500).json({ msg: 'Database connection failed', error: err.message });
  }
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/ai', require('./routes/ai'));

// Diagnostic Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: db.isConnected() ? 'Connected' : 'Disconnected',
    env_check: {
      has_mongo: !!process.env.MONGO_URI,
      has_jwt: !!process.env.JWT_SECRET,
      has_gemini: !!process.env.GEMINI_API_KEY
    }
  });
});

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
    res.json({
      msg: 'NileVault API Running...',
      status: 'Ready'
    });
  });
}

// Only listen if NOT running as a serverless function (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;

