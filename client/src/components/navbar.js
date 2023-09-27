import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from './avatar.js';
import axios from 'axios';

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user data and authentication status
    fetch("http://localhost:8000/auth/profile")
      .then((res) => res.json())
      .then((data) => {
       // console.log(data);
        setIsAuthenticated(data.isAuthenticated);
        setUsername(data.username);
      })
      .catch((error) => console.error(error));
  }, [isAuthenticated]);

  const handleSignIn = (e) => {
    e.preventDefault();

    window.open('http://localhost:8000/auth/SignIn',
               "_self"
               );
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
     <Container>
        <Navbar.Brand className="text-warning" href="#">Vidset</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={<Avatar/>} id="collapsible-nav-dropdown">
              {isAuthenticated ? (
               <NavDropdown.Item href="#action/3.1">{username}</NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleSignIn}>Log In</NavDropdown.Item>
              )}
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
