const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please submit a valid email address",
      ],
    },
    rollno: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Student", studentSchema);
