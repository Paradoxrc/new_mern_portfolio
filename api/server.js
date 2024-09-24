const express = require("express");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Import database configuration
const dbConfig = require("./config/dbConfig");

const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());

app.use("/api/portfolio", portfolioRoute);

// Set up the server
app.listen(5000, () => console.log("Server started at port 5000"));
