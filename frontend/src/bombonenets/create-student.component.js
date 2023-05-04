// CreateStudent Component for add new student

// Import Modules
import React from "react";
import api from "../api";
import StudentForm from "./StudentForm";
import { useRouter } from "next/router";

// CreateStudent Component
const CreateStudent = () => {
  const router = useRouter();

  const formValues = {
    name: "",
    email: "",
    rollno: "",
  };
  // onSubmit handler
  const onSubmit = (studentObject) => {
    api
      .post("/students/create-student", studentObject)
      .then((res) => {
        if (res.status === 201) {
          alert("Student successfully created");
          router.push("/student-list");
        } else {
          alert("Request failed with status " + res.status);
        }
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
