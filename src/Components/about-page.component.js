import React, { useState, useEffect } from "react";

function AboutPage() {
  const [readme, setReadme] = useState("");
  const path = require("path");

  const readmePath = path.join(__dirname, "..", "..", "README.md");

  useEffect(() => {
    fetch(readmePath)
      .then((response) => response.text())
      .then((data) => {
        setReadme(data);
      });
  }, [readmePath]);

  return (
    <div>
      <div
        className="readme"
        // dangerouslySetInnerHTML={{ __html: readme }}
      >
        {" "}
        Not working yet{" "}
      </div>
    </div>
  );
}

export default AboutPage;
