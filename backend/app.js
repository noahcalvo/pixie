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

// Catch any error that happened in the backend. If no status code resulted, return 500
app.use(function (err, _req, res) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Export it so that server.js can use it
module.exports = app;
