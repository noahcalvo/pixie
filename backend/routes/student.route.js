let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const { request } = require("../app");
// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
router.post("/create-student", async (req, res) => {
  try {
    const result = await studentSchema.create(req.body);
    console.log(result);
    console.log(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
  }
});

// READ Students
router.get("/", async (_req, res) => {
  try {
    const student = await studentSchema.find();
    return res.json(student);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE student
router
  .route("/update-student/:id")
  // Get Single Student
  .get(async (req, res) => {
    try {
      const student = await studentSchema.findById(req.params.id);
      res.status(200).json(student);
      console.log(student);
    } catch (error) {
      console.log(error);
    }
  })

  // Update Student Data
  .put(async (req, res) => {
    try {
      const student = await studentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(204).json(student);
      console.log(student);
    } catch (error) {
      console.log(error);
    }
  });

// Delete Student
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const result = await studentSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({
      msg: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
