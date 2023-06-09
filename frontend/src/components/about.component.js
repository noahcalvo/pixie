import React, { useState, useEffect } from "react";
import { parse } from "marked";
import { Spinner } from "react-bootstrap";

function About() {
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/README.md")
      .then((response) => response.text())
      .then((text) => {
        setReadme(parse(text));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="custom-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="readme" dangerouslySetInnerHTML={{ __html: readme }} />
      )}{" "}
    </div>
  );
}

export default About;
