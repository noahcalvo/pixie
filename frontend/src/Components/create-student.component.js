// CreateStudent Component for add new student

// Import Modules
import React, { useState } from "react";
import api from "../api";
import StudentForm from "./StudentForm";

// CreateStudent Component
const CreateStudent = () => {
  const formValues = {
    name: "",
    email: "",
    rollno: "",
  };
  // onSubmit handler
  const onSubmit = async (studentObject) => {
    api
      .post("/students/create-student", studentObject)
      .then((res) => {
        if (res.status === 201) alert("Student successfully created");
        else
          Promise.reject(new Error("Request failed with status " + res.status));
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
