const mongoose = require("mongoose");
const uri = process.env.MONGO_URI || MONGODB_URI;

async function connectDB() {
  try {
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