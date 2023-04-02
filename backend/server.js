let mongoose = require("mongoose");
let dbConfig = require("./database/db");

// Import app.js
let app = require("./app");

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = dbConfig.db || "mongodb://localhost/todoapiDB";

// Connecting MongoDB Database
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Server connected to mongodb");
    app.listen(PORT, () => {
      console.log("Server initiated successfully. Listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
