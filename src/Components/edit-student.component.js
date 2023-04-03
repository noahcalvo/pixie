// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import { useParams, useNavigate } from "react-router-dom";

// EditStudent Component
const EditStudent = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  //onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put("http://localhost:4000/students/update-student/" + id, studentObject)
      .then((res) => {
        if (res.status === 204) {
          alert("Student successfully updated");
          // navigate(-1) navigates to the previous page, /student-list
          navigate(-1);
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:4000/students/update-student/" + id)
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
