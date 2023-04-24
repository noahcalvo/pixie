import React, { useState } from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import dynamic from "next/dynamic";
import GoogleSignInButton from "../Components/google-sign-in-button";
import useAuth from "../useAuth";

const CreateStudent = dynamic(() =>
  import("../Components/create-student.component")
);
const StudentList = dynamic(() =>
  import("../Components/student-list.component")
);
const AboutPage = dynamic(() => import("../Components/about-page.component"));

const HomePage = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState(<CreateStudent />);

  const renderComponent = (component) => {
    setSelectedComponent(component);
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" variant="dark">
          <Container>
            <Navbar.Brand>
              <button
                style={buttonStyle}
                onClick={() => renderComponent(<CreateStudent />)}
                className="nav-link"
              >
                Pixie{" "}
                <span role="img" aria-label="fairy">
                  🧚
                </span>
              </button>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <button
                  style={buttonStyle}
                  onClick={() => renderComponent(<CreateStudent />)}
                  className="nav-link"
                >
                  Create Student
                </button>
              </Nav>

              <Nav>
                <button
                  style={buttonStyle}
                  onClick={() => renderComponent(<StudentList />)}
                  className="nav-link"
                >
                  Student List
                </button>
              </Nav>

              <Nav>
                <button
                  style={buttonStyle}
                  onClick={() => renderComponent(<AboutPage />)}
                  className="nav-link"
                >
                  About Page
                </button>
              </Nav>
              <Nav>
                <GoogleSignInButton
                  signIn={signInWithGoogle}
                  user={user}
                  signOut={signOut}
                />
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">{selectedComponent}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
