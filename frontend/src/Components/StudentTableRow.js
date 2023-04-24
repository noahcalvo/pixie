import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import api from "../api";

const StudentTableRow = (props) => {
  const { _id, name, email, rollno } = props.obj;

  const deleteStudent = () => {
    api
      .delete("/students/delete-student/" + _id)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{rollno}</td>
      <td>
        <Link href={`/edit-student/${_id}`} passHref>
          Edit
        </Link>
        <Button onClick={deleteStudent} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
