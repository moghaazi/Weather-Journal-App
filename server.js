// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require("express"); // Express
const cors = require("cors"); // Cors
const app = express(); // Instance
const port = 3000; // Port

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, console.log(`Server running on http://localhost:${port}`));

// Get all
app.get("/all", (req, res) => res.send(projectData));

// Post request
app.post("/addData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };

  console.log(projectData);
  res.send(projectData);
});
