const express = require("express");
const app = express();
const port = process.env.PORT || 10000;


// Load environment variables from .env file
require("dotenv").config();

// Import database configuration
const dbConfig = require("./config/dbConfig");

const portfolioRoute = require("./routes/portfolioRoute");
app.use(express.json());

app.use("/api/portfolio", portfolioRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
  });

// Set up the server
app.listen(port, () => console.log("Server started at port 10000"));
