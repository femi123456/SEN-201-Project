const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'lecturer'], default: 'student' },
  matricNumber: { type: String },
  department: { type: String },
  level: { type: String },
  enrolledCourses: [{ type: String }],
  savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
