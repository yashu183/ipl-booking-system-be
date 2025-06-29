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

app.use(cors());  

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
