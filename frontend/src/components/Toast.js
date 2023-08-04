import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const ToastComponent = ({ message, removeToast }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Toast
      show={show}
      onClose={handleClose}
      onHide={() => removeToast(message)}
      delay={3000}
      autohide
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
