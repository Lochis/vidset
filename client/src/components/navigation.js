import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
/*import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
/import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';*/
import avatarPic from './avatar.js';
import {Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";

function Navigation({user}) {
  let [auth, setAuth] = useState(false);
  let [username, setUsername] = useState('');

  const handleSignIn = (e) => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const handleLogOut = (e) => {
    window.open("http://localhost:8000/auth/logout", "_self");
  };

  return (
 <Navbar>
      <NavbarBrand>
        <p className="font-bold text-purple-500 text-xl" ><Link to="/">VIDSET</Link></p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">

      </NavbarContent>
          {user ? (
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
             {user ? (
           <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.displayName}
              size="lg"
             src={user._json.picture}
            />
             ) : (
               <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.displayName}
              size="lg"
              src="https://source.boringavatars.com/beam/50"
               />
             )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
            <p className="font-semibold text-green-500">{user.displayName}</p>
            </DropdownItem>
            <DropdownItem className="text-purple-400" key="settings"><Link to="/settings">Settings</Link></DropdownItem>
            <DropdownItem className="text-purple-400" key="dashboard"><Link to="/dashboard">Dashboard</Link></DropdownItem>
            <DropdownItem className="text-purple-400" key="schedule">Schedule</DropdownItem>
            <DropdownItem key="logout" className="text-red-500" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
          ) : (
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
           <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src="https://source.boringavatars.com/beam/50"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="login" color="danger" onClick={handleSignIn}>
              Login
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
          )}
    </Navbar>
  );
}

export default Navigation;
