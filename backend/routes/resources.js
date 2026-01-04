const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');

// Ensure uploads directory exists (Safe for Serverless)
const uploadDir = path.join(__dirname, '../uploads');
try {
  if (!process.env.VERCEL && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create uploads directory:', err.message);
}

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Unique filename: fieldname-timestamp.ext
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/resources
// @desc    Upload a new resource
// @access  Public (should be protected in real app)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, uploader } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const resource = await db.resources.create({
      title,
      description,
      category,
      fileUrl: `/uploads/${req.file.filename}`, // Relative path for frontend
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploader: uploader || null
    });

    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/resources
// @desc    Get all resources (with search & filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, category, limit } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let resourcesQuery = db.resources.find(query).sort({ createdAt: -1 });
    if (limit) {
      resourcesQuery = resourcesQuery.limit(parseInt(limit));
    }

    const resources = await resourcesQuery;
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/resources/:id
// @desc    Get resource by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const resource = await db.resources.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
