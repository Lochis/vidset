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
        <p className="font-bold text-inherit">VIDSET</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
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
              size="md"
             src={user._json.picture}
            />
             ) : (
               <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.displayName}
              size="md"
              src="https://source.boringavatars.com/beam/50"
               />
             )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.displayName}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
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
