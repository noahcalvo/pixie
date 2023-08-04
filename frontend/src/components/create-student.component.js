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
  const [toastMessages, setToastMessages] = useState([]);
  const formValues = {
    name: "",
    email: "",
    rollno: "",
  };

  const addToast = (message) => {
    setToastMessages((messages) => [...messages, message]);
  };

  const removeToast = (message) => {
    setToastMessages((messages) => messages.filter((m) => m !== message));
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
          addToast("Request failed with status " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong\n" + err);
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
          addToast("Default student created!");
        } else {
          console.log(res.message);
          addToast("Request failed with status " + res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        addToast("Something went wrong\n" + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Return student form
  return (
    <div>
      <div className="toast-container">
        {toastMessages.map((message, index) => (
          <ToastComponent
            key={index}
            message={message}
            removeToast={removeToast}
          />
        ))}
      </div>
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
