import React, { useState, useEffect } from "react";
import { parse } from "marked";
import readmePath from "../README.md";

function AboutPage() {
  const [readme, setReadme] = useState("");

  useEffect(() => {
    fetch(readmePath)
      .then((response) => response.text())
      .then((text) => {
        setReadme(parse(text));
      });
  }, []);

  return (
    <div>
      <div className="readme" dangerouslySetInnerHTML={{ __html: readme }} />
    </div>
  );
}

export default AboutPage;
