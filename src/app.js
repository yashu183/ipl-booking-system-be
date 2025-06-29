const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./apis/routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { responseHandler } = require('./middlewares/responseHandler');
const { connectDB } = require('./configs/database');

// config env vars
require('dotenv').config();

// Initialize Express application
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://ipl-booking-system-fe.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

app.use(errorHandler);
app.use(responseHandler);

// Start the server only after database connection
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start the Express server
    const PORT = process.env.PORT || 5555;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
