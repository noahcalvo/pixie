import React from "react";
import { Button } from "react-bootstrap";

const DefaultStudentButton = ({ onClick }) => {
  return (
    <div className="form-wrapper">
      <Button variant="light" size="lg" block="block" onClick={onClick}>
        Create Default Student
      </Button>
    </div>
  );
};

export default DefaultStudentButton;
