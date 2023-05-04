// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import api from "../api";
import StudentForm from "./StudentForm";
import { useRouter } from "next/router";

// EditStudent Component
const EditStudent = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  //onSubmit handler
  const onSubmit = (studentObject) => {
    api
      .put("/students/update-student/" + id, studentObject)
      .then((res) => {
        if (res.status === 204) {
          alert("Student successfully updated");
          // navigate(-1) navigates to the previous page, /student-list
          router.back();
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    api
      .get("/students/update-student/" + id)
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Return student form
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </StudentForm>
  );
};

// Export EditStudent Component
export default EditStudent;
