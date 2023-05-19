import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

var isAuth = "";
var username = "";

const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent the default behavior of the link
    // Perform a server-side request using fetch or axios
    // Replace 'http://localhost:3000' with the appropriate server URL
    const response = await axios.get('http://localhost:3000/auth/signIn');
    window.location.href=response.data.redirectUrl;
     
  };

const HeaderNav = () => {
    return(
        <div>
            <Navbar bg="dark" expand="lg">
                <Container>
                <Navbar.Brand className="text-warning" href="/">Vidset</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"> 
                    <Nav className="me-auto">
                        <Nav.Link id="Dashboard" className="text-white" href="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                        <div className="d-flex dropdown">
                        {isAuth && (
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://source.boringavatars.com/beam/50"></img>
                        </a>
                        )}
                        {!isAuth && (
                            <button onClick={handleSignIn} className="btn btn-outline-warning">Log in</button>
                        )}
                        {isAuth && (
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item className="dropdown-item text-info">{username}</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="text-danger" href="/auth/logout">Log Out</NavDropdown.Item>
                        </NavDropdown>
                        )}
                        </div>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default HeaderNav;