const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Use the correct environment variable name
mongoose.connect(process.env.MONGO_URL, {
   
});

const connection = mongoose.connection;

connection.on('error', () => {
    console.log("error in db connection");
});

connection.on('connected', () => {
    console.log("connected to db");
});

module.exports = connection;
