const mongoose = require('mongoose');
const User = require('./models/User');
const Resource = require('./models/Resource');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ MONGO_URI is not defined in environment variables');
      throw new Error('Database configuration missing');
    }

    const conn = await mongoose.connect(uri);
    isConnected = !!conn.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    // Don't exit process in serverless!
  }
};

const db = {
  users: User,
  resources: Resource,
  connectDB,
  isConnected: () => isConnected
};

module.exports = db;
