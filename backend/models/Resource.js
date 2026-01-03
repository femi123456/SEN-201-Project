const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileSize: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
