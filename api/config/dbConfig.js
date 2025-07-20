const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

console.log("Attempting to connect to MongoDB...");
console.log("MONGO_URL:", process.env.MONGO_URL ? "URL is set" : "URL is missing");

// Use the correct environment variable name
mongoose.connect(process.env.MONGO_URL, {
   
});

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.log("Error in DB connection:", error);
});

connection.on('connected', () => {
    console.log("Successfully connected to MongoDB");
});

connection.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

module.exports = connection;
