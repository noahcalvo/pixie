import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { Spinner } from "react-bootstrap";

const StudentTableRow = ({ student, deleteStudent }) => {
  const { _id, name, email, rollno } = student;
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteStudent(_id)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <tr>
      {loading ? (
        <td colSpan={4}>
          <div className="spinner-container">
            <Spinner
              animation="border"
              role="status"
              className="custom-spinner"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </td>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{rollno}</td>
          <td>
            <Link href={`/edit-student/${_id}`} passHref>
              Edit
            </Link>
            <Button onClick={handleDelete} size="sm" variant="danger">
              Delete
            </Button>
          </td>
        </>
      )}{" "}
    </tr>
  );
};

export default StudentTableRow;
