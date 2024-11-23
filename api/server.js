const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
const port = process.env.PORT || 10000;

// Load environment variables from .env file
require("dotenv").config();

// Import database configuration
const dbConfig = require("./config/dbConfig");

// Set up CORS to allow requests only from your frontend URL
const corsOptions = {
  origin: "https://dinith-edirisinghe.onrender.com", // Frontend URL
  optionsSuccessStatus: 200, // For older browsers compatibility
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware to parse JSON
app.use(express.json());

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
app.use("https://newww-mern-portfolio-backend.onrender.com/api/portfolio", portfolioRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Set up the server
app.listen(port, () => console.log(`Server started at port ${port}`));
