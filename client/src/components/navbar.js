import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from './avatar.js';
import axios from 'axios';

function NavBar({user}) {
  let [auth, setAuth] = useState(false);
  let [username, setUsername] = useState('');

  const handleSignIn = (e) => {
    window.open("http://localhost:8000/auth/google", "_self");
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
              {user ? (
               <NavDropdown.Item className="text-info" href="#action/3.1">{user.displayName}</NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleSignIn}>Log In</NavDropdown.Item>
              )}
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" href="#action/3.4">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
