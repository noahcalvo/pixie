import React, { useState, useEffect } from "react";
import { parse } from "marked";

function About() {
  const [readme, setReadme] = useState("");

  useEffect(() => {
    fetch("/README.md")
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

export default About;
