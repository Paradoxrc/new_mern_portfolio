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
app.use(cors({ 
  origin: ["http://localhost:3000", "http://newww-mern-portfolio-backend.onrender.com"], 
  optionsSuccessStatus: 200 
})); // Allow frontend URLs
app.use(express.json()); // Parse JSON payloads

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
const uploadRoute = require("./routes/uploadRouteCloudinary");

app.use("/api/portfolio", portfolioRoute);
app.use("/api/upload", uploadRoute);

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
