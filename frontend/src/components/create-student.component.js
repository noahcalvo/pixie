// CreateStudent Component for add new student

// Import Modules
import React, { useState } from "react";
import api from "../api";
import StudentForm from "./StudentForm";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import ToastComponent from "./Toast";

// CreateStudent Component
const CreateStudent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [failedUploadMsg, setFailedUploadMsg] = useState("");
  const formValues = {
    name: "",
    email: "",
    rollno: "",
  };
  // onSubmit handler
  const onSubmit = (studentObject) => {
    setLoading(true);
    api
      .post("/students/create-student", studentObject)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("success", "Student successfully created");
          router.push("/student-list");
        } else {
          setFailedUploadMsg("Request failed with status " + res.status);
        }
      })
      .catch((err) => setFailedUploadMsg("Something went wrong\n" + err))
      .finally(() => {
        setLoading(false);
      });
  };

  // Return student form
  return (
    <div>
      {failedUploadMsg && <ToastComponent message={failedUploadMsg} />}
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <StudentForm
          initialValues={formValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          Create Student
        </StudentForm>
      )}{" "}
    </div>
  );
};

// Export CreateStudent Component
export default CreateStudent;
