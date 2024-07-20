const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the config.env file
dotenv.config({ path: "./config.env" });

async function connectDB() {
  try {
    // Connect to the database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to db");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
} 

module.exports = connectDB;
