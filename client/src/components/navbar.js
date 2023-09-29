import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Avatar from './avatar.js';

function NavBar({user}) {
  let [auth, setAuth] = useState(false);
  let [username, setUsername] = useState('');

  const handleSignIn = (e) => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const handleLogOut = (e) => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
     <Container>
     <Link className="text-decoration-none" to="/">
      <Navbar.Brand className="text-warning">Vidset</Navbar.Brand>
      </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link className="text-decoration-none" to="/dashboard">Dashboard</Link></Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={<Avatar/>} id="collapsible-nav-dropdown">
              {user ? (
               <NavDropdown.Item className="text-info">{user.displayName}</NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleSignIn}>Log In</NavDropdown.Item>
              )}
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" onClick={handleLogOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr/>
    </div>
  );
}

export default NavBar;
