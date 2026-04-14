const mongoose = require("mongoose");
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (!uri) {
      throw new Error("Missing MongoDB connection string. Set MONGO_URI or MONGODB_URI in your environment.");
    }

    await mongoose.connect(uri, {
      dbName: 'BanyanHire'
    });
    console.log("Connected to MongoDB database: BanyanHire");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

module.exports = { connectDB };