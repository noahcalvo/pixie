import React, { useState, useEffect } from "react";
import api from "../api";
import { Table, Spinner } from "react-bootstrap";
import StudentTableRow from "./StudentTableRow";
import ToastComponent from "./Toast";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [deletionMessage, setDeletionMessage] = useState();

  useEffect(() => {
    const message = localStorage.getItem("success");
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem("success");
    }
    setLoading(true);
    api
      .get("/students/")
      .then(({ data }) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteStudent = (id) => {
    return api
      .delete("/students/delete-student/" + id)
      .then(() => {
        setStudents(students.filter((student) => student._id !== id));
        setDeletionMessage("Student successfully deleted");
      })
      .catch((err) => {
        console.error(err);
        setDeletionMessage("Failed to delete student");
      });
  };

  const DataTable = () => {
    return students.map((res, i) => {
      return (
        <StudentTableRow student={res} key={i} deleteStudent={deleteStudent} />
      );
    });
  };

  return (
    <div className="table-wrapper">
      {/* Toast Container */}
      <div className="toast-container">
        {deletionMessage && <ToastComponent message={deletionMessage} />}
        {successMessage && <ToastComponent message={successMessage} />}
      </div>
      {/* Loading placeholder */}
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{DataTable()}</tbody>
        </Table>
      )}
    </div>
  );
};

export default StudentList;
