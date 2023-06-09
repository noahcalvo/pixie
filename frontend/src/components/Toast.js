import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const ToastComponent = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Toast
      show={show}
      onClose={handleClose}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
      }}
    >
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
