const mongoose = require('mongoose');
const User = require('./models/User');
const Resource = require('./models/Resource');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

const db = {
  users: User,
  resources: Resource,
  connectDB
};

module.exports = db;
