// CreateStudent Component for add new student

// Import Modules
import React, { useState } from "react";
import StudentForm from "./StudentForm";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import ToastComponent from "./Toast";
import { createStudent } from "../api/studentAPI";
import DefaultStudentButton from "./default-student-button.component";

// CreateStudent Component
const CreateStudent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const formValues = {
    name: "",
    email: "",
    rollno: "",
  };
  // onSubmit handler
  const onSubmit = (studentObject) => {
    setLoading(true);
    createStudent(studentObject)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("success", "Student successfully created");
          router.push("/student-list");
        } else {
          console.log(res.status);
          setToastMessage("Request failed with status " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMessage("Something went wrong\n" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createDefaultStudent = () => {
    setLoading(true);
    const defaultStudent = {
      name: "Default Student",
      email: "default@example.com",
      rollno: 0,
    };
    createStudent(defaultStudent)
      .then((res) => {
        if (res.status === 201) {
          setToastMessage("Student created!");
        } else {
          console.log(res.message);
          setToastMessage("Request failed with status " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMessage("Something went wrong\n" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Return student form
  return (
    <div>
      {toastMessage && <ToastComponent message={toastMessage} />}
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <StudentForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            Create Student
          </StudentForm>
          <DefaultStudentButton onClick={createDefaultStudent} />
        </div>
      )}{" "}
    </div>
  );
};

// Export CreateStudent Component
export default CreateStudent;
