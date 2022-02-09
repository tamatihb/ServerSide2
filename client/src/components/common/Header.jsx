import React from "react";
import { Navbar, Nav, Button, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";
import { GiChefToque } from "react-icons/gi";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { onLogout, user } = useAuth();

  return (
    <div id="nav">
      <Navbar variant="light">
        <GiChefToque className="mb-4" />
        <Navbar.Brand className="header" href="/">
          <p className="Head">Chefs Hat</p>
        </Navbar.Brand>
        <Nav className="mr-auto mt-1">
          <Nav.Link href="/">
            <p>Home</p>
          </Nav.Link>
          <Nav.Link href="/about">
            <p>About</p>
          </Nav.Link>
          <Nav.Link href="/restaurant">
            <p>Restaurants</p>
          </Nav.Link>
        </Nav>
        {/*! conditional routes with a -logout button only show when logged in same with login */}
        {/* app.js  */}
        {/* if not a user ! */}
        {!user && (
          <NavItem className="btn mt-1 btn-sm ">
            <Button className="btn1" variant="outline-success" href="/login">
              Login
            </Button>
          </NavItem>
        )}
        {!user && (
          <NavItem className="btn mt-1 btn-sm ">
            <Button className="btn2" variant="outline-success" href="/signup">
              Register
            </Button>
          </NavItem>
        )}
        {/* writing in jsx within html in react {navitem} */}
        {user && (
          <NavItem className="btn mt-1 btn-sm ">
            <Button
              className="btn2"
              variant="outline-warning"
              href="/login"
              onClick={() => {
                onLogout();
              }}
            >
              Logout
            </Button>
          </NavItem>
        )}
      </Navbar>
    </div>
  );
}
export default Header;
