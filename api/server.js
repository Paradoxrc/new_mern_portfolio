const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 10000;

// Load environment variables from .env file
require("dotenv").config();

// Import database configuration
const dbConfig = require("./config/dbConfig");

// Middleware
app.use(cors({ origin: "https://dinith-edirisinghe.onrender.com", optionsSuccessStatus: 200 })); // Allow frontend URL
app.use(express.json()); // Parse JSON payloads

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// Default route for API testing
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
//
// Serve React frontend for non-API routes
app.use(express.static(path.join(__dirname, "build"))); // Adjust path if needed
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
