const mongoose = require('mongoose');
require('dotenv').config();
const { DatabaseConstants } = require('../constants/DatabaseConstants');

const connectDB = async () => {
  try {
    let mongoURI;
    
    if (process.env.MONGODB_URI) {
      // If MONGODB_URI is provided, use it directly
      mongoURI = process.env.MONGODB_URI;
    } else {
      // Fallback to individual components
      mongoURI = `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'ipl_booking_system'}`;
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    const connection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
    });
    
    console.log(DatabaseConstants.ConnectionSuccessful);
    console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
    
    return connection;
  } catch (error) {
    console.error(DatabaseConstants.ConnectionFailed, error);
    console.error('Full error details:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = { connectDB, mongoose };
