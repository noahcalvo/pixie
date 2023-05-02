import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
// import dynamic from "next/dynamic";
import GoogleSignInButton from "../components/google-sign-in-button";
import useAuth from "../useAuth";
import Link from "next/link";

const HeaderNav = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link className="button-link" href="/create-student">
                <span className="nav-link brand-link">Pixie 🧚</span>
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link className="button-link" href="/create-student">
                  <span className="nav-link">Create Student</span>
                </Link>
              </Nav>

              <Nav>
                <Link className="button-link" href="/student-list">
                  <span className="nav-link">Student List</span>
                </Link>
              </Nav>

              <Nav>
                <Link className="button-link" href="/about">
                  <span className="nav-link">About Page</span>
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
    </div>
  );
};

export default HeaderNav;
