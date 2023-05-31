let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

// Express Routes
const studentRoute = require("./routes/student.route");

// Create the express app
const app = express();

// Parse the body if it is json, and parse the url and add it to the body.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Allow frontend to call backend
app.use(cors());

// Set up the routers
app.use("/students", studentRoute);

// 404 Error, catch-all
app.use((_req, res) => {
  res.status(404).send("Error 404!");
});

// Error handling middleware
app.use(function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    res.status(400).json({ error: "Invalid request" });
  } else {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export it so that server.js can use it
module.exports = app;
