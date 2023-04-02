// CreateStudent Component for add new student

// Import Modules
import React, { useState } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";

// CreateStudent Component
const CreateStudent = () => {
  const [formValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
  // onSubmit handler
  const onSubmit = async (studentObject) => {
    axios
      .post("http://localhost:4000/students/create-student", studentObject)
      .then((res) => {
        console.log("hellp");
        if (res.status === 200) alert("Student successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong\n" + err));
  };

  // Return student form
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Student
    </StudentForm>
  );
};

// Export CreateStudent Component
export default CreateStudent;
