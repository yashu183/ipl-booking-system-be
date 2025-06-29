const mongoose = require('mongoose');

class DatabaseSwitcher {
  static async switchDatabase(databaseName) {
    try {
      // Close current connection if exists
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
      }

      // Create new connection string with different database
      let mongoURI = process.env.MONGODB_URI;
      
      if (mongoURI.includes('mongodb+srv://')) {
        // For Atlas connections
        const baseURI = mongoURI.split('?')[0]; // Remove query parameters
        const queryParams = mongoURI.includes('?') ? '?' + mongoURI.split('?')[1] : '';
        
        // Remove existing database name if present
        const uriParts = baseURI.split('/');
        if (uriParts.length > 3) {
          uriParts[3] = databaseName;
        } else {
          uriParts.push(databaseName);
        }
        
        mongoURI = uriParts.join('/') + queryParams;
      } else {
        // For local MongoDB
        const uriParts = mongoURI.split('/');
        uriParts[uriParts.length - 1] = databaseName;
        mongoURI = uriParts.join('/');
      }

      // Connect to new database
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(`Switched to database: ${databaseName}`);
      return mongoose.connection.db;
    } catch (error) {
      console.error('Error switching database:', error);
      throw error;
    }
  }

  static getCurrentDatabase() {
    return mongoose.connection.db?.databaseName || 'Not connected';
  }

  static async listDatabases() {
    try {
      const admin = mongoose.connection.db.admin();
      const result = await admin.listDatabases();
      return result.databases.map(db => db.name);
    } catch (error) {
      console.error('Error listing databases:', error);
      throw error;
    }
  }
}

module.exports = DatabaseSwitcher;
