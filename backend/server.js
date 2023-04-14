let mongoose = require("mongoose");

// Import app.js
let app = require("./app");

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  process.env.DATABASE_STRING || "mongodb://localhost/todoapiDB";

console.log(MONGODB_URI);
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
