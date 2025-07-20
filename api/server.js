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
  origin: [
    "http://localhost:3000", 
    "https://dinith-edirisinghe.onrender.com",
    "https://newww-mern-portfolio-backend.onrender.com"
  ], 
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Allow frontend URLs
app.use(express.json()); // Parse JSON payloads

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
const uploadRoute = require("./routes/uploadRouteCloudinary");

app.use("/api/portfolio", portfolioRoute);
app.use("/api/upload", uploadRoute);

// Default route for API testing
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the backend server!", 
    status: "running",
    timestamp: new Date().toISOString(),
    cors: "enabled for dinith-edirisinghe.onrender.com"
  });
});
//
// Serve React frontend for non-API routes
app.use(express.static(path.join(__dirname, "build"))); // Adjust path if needed
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server started at port ${port}`);
  console.log(`🌍 CORS enabled for: localhost:3000, dinith-edirisinghe.onrender.com`);
  console.log(`📊 MongoDB: ${process.env.MONGO_URL ? 'Connected' : 'Not configured'}`);
});
