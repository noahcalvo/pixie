// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pixie.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Component
import CreateStudent from "./Components/create-student.component";
import EditStudent from "./Components/edit-student.component";
import StudentList from "./Components/student-list.component";
import AboutPage from "./Components/about-page.component";
import GoogleSignInButton from "./Components/google-sign-in-button";

// Import Firebase and Auth logic
import useAuth from "./useAuth";

// App Component
const App = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="light" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-student"} className="nav-link">
                  Pixie{" "}
                  <span role="img" aria-label="fairy">
                    🧚
                  </span>
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-student"} className="nav-link">
                    Create Student
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/student-list"} className="nav-link">
                    Student List
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/info"} className="nav-link">
                    About Page
                  </Link>
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
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<CreateStudent />} />
                  <Route path="/create-student" element={<CreateStudent />} />
                  <Route path="/edit-student/:id" element={<EditStudent />} />
                  <Route path="/student-list" element={<StudentList />} />
                  <Route path="/info" element={<AboutPage />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
